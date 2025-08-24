// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if backend is reachable
    const response = await fetch('http://localhost:3001/api/health');
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ 
        status: 'healthy', 
        backend: data 
      });
    } else {
      return NextResponse.json(
        { status: 'unhealthy', error: 'Backend not responding' },
        { status: 503 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: 'Cannot connect to backend' },
      { status: 503 }
    );
  }
}