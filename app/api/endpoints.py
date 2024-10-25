from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
import pickle
from prophet import Prophet
from typing import List
import os

router = APIRouter()

# Load the trained Prophet model
model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'prophet_model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

class ForecastRequest(BaseModel):
    future_days: int
    regions: List[str]

class ForecastResponse(BaseModel):
    date: str
    forecast: float
    lower_bound: float
    upper_bound: float

@router.post("/forecast", response_model=List[ForecastResponse])
async def get_forecast(request: ForecastRequest):
    try:
        # Create future dataframe
        future = model.make_future_dataframe(periods=request.future_days)
        
        # Get all region columns from the model
        region_columns = [col for col in model.extra_regressors.keys() if col.startswith('region_')]
        
        # Initialize all region columns to 0
        for col in region_columns:
            future[col] = 0
        
        # Set requested regions to 1
        for region in request.regions:
            col_name = f'region_{region}'
            if col_name in region_columns:
                future[col_name] = 1
            else:
                print(f"Warning: Region '{region}' not found in model")
        
        # Make prediction
        forecast = model.predict(future)
        
        # Prepare response
        response = []
        for _, row in forecast.tail(request.future_days).iterrows():
            response.append(ForecastResponse(
                date=row['ds'].strftime('%Y-%m-%d'),
                forecast=row['yhat'],
                lower_bound=row['yhat_lower'],
                upper_bound=row['yhat_upper']
            ))
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
