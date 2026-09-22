import os
import tempfile
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pcap_processor import parse_pcap_file

app = FastAPI(
    title="SentinelX Predictive Cyber Defence Backend API",
    description="PCAP/CSV Ingestion, Feature Extraction, Temporal State Builder, and World Model Simulation Engine",
    version="1.0.0"
)

# Enable CORS for React Vite Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "SentinelX Telemetry Engine",
        "version": "1.0.0"
    }

@app.post("/api/analyze-telemetry")
async def analyze_telemetry(file: UploadFile = File(...)):
    filename = file.filename
    if not filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ['.pcap', '.pcapng', '.csv']:
        raise HTTPException(status_code=400, detail=f"Unsupported file format '{ext}'. Accepted formats: .pcap, .pcapng, .csv")

    try:
        # Save file to temporary storage for processing
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        # Process file using PCAP processor module
        result = parse_pcap_file(tmp_path, filename)
        
        # Cleanup temp file
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
            
        return result
    except Exception as e:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise HTTPException(status_code=500, detail=f"Failed to process telemetry file: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
