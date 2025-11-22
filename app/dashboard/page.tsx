'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [docs, setDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocs()
  }, [])

  async function fetchDocs() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return // Handle redirect
    const { data } = await supabase.from('documents').select('*').eq('user_id', user.id)
    setDocs(data || [])
    setLoading(false)
  }

  async function createDoc() {
    const { data: { user } } = await supabase.auth.getUser()
    // Check limits here based on subscription
    const { data, error } = await supabase.from('documents').insert({
      user_id: user?.id,
      title: 'Untitled Contract',
      content: '# Agreement\n\nParty A agrees to pay Party B...\n\n> **Sign Below**'
    }).select().single()
    
    if (data) window.location.href = `/editor/${data.id}`
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Documents</h1>
        <button onClick={createDoc} className="bg-black text-white px-4 py-2 rounded shadow hover:opacity-90">
          + New Document
        </button>
      </div>
      
      <div className="grid gap-4">
        {docs.map(doc => (
          <div key={doc.id} className="border p-4 rounded flex justify-between items-center bg-white shadow-sm">
            <div>
              <h3 className="font-bold">{doc.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${doc.status === 'signed' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                {doc.status.toUpperCase()}
              </span>
            </div>
            <div className="flex gap-2">
               <a href={`/editor/${doc.id}`} className="text-blue-600 hover:underline">Edit</a>
               {doc.status !== 'draft' && (
                 <a href={`/sign/${doc.id}`} target="_blank" className="text-gray-500 hover:underline">View Link</a>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}