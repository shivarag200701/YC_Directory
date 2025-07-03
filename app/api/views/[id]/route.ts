import { NextRequest, NextResponse } from 'next/server'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        
        // Get current views with CDN for faster response
        const { views: currentViews } = await client.fetch(STARTUP_VIEWS_QUERY, { id })
        
        // Increment views in background (non-blocking)
        writeClient
            .patch(id)
            .set({ views: (currentViews || 0) + 1 })
            .commit()
            .catch(console.error) // Don't block on error
        
        return NextResponse.json({ views: currentViews || 0 })
    } catch (error) {
        console.error('Error in views API:', error)
        return NextResponse.json({ views: 0 }, { status: 500 })
    }
} 