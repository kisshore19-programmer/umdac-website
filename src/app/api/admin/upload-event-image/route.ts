import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      const singleFile = formData.get('file') as File | null
      if (singleFile) {
        files.push(singleFile)
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'events')
    await mkdir(uploadDir, { recursive: true })

    const uploadedUrls: string[] = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Clean file name
      const sanitizedName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, '_')
        .replace(/_{2,}/g, '_')
      const fileName = `${Date.now()}_${sanitizedName}`
      const filePath = path.join(uploadDir, fileName)

      // Save to public/events/ folder
      await writeFile(filePath, buffer)
      let publicUrl = `/events/${fileName}`

      // Optionally attempt Supabase Storage upload if available
      try {
        const supabase = await createClient()
        const { data: uploadData, error: sbError } = await supabase.storage
          .from('events')
          .upload(fileName, buffer, {
            contentType: file.type || 'image/jpeg',
            upsert: true,
          })
        if (!sbError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('events')
            .getPublicUrl(fileName)
          if (publicUrlData?.publicUrl) {
            publicUrl = publicUrlData.publicUrl
          }
        }
      } catch {
        // Fallback to local public URL
      }

      uploadedUrls.push(publicUrl)
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      url: uploadedUrls[0],
    })
  } catch (error: any) {
    console.error('Error uploading event image:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    )
  }
}
