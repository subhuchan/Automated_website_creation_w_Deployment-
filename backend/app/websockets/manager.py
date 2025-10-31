from typing import Dict, Set
from fastapi import WebSocket
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: Set[WebSocket] = set()
        self.project_subscribers: Dict[str, Set[WebSocket]] = {}
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.add(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.discard(websocket)
        # Remove from all project subscriptions
        for subscribers in self.project_subscribers.values():
            subscribers.discard(websocket)
    
    async def subscribe_to_project(self, websocket: WebSocket, task_id: str):
        if task_id not in self.project_subscribers:
            self.project_subscribers[task_id] = set()
        self.project_subscribers[task_id].add(websocket)
    
    async def broadcast_project_update(self, task_id: str, data: dict):
        """Send update to all subscribers of a specific project"""
        if task_id in self.project_subscribers:
            message = json.dumps({"type": "project_update", "task_id": task_id, "data": data})
            disconnected = set()
            for connection in self.project_subscribers[task_id]:
                try:
                    await connection.send_text(message)
                except:
                    disconnected.add(connection)
            
            # Clean up disconnected clients
            for conn in disconnected:
                self.project_subscribers[task_id].discard(conn)
    
    async def broadcast_global(self, data: dict):
        """Send update to all connected clients"""
        message = json.dumps({"type": "global_update", "data": data})
        disconnected = set()
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                disconnected.add(connection)
        
        # Clean up disconnected clients
        for conn in disconnected:
            self.disconnect(conn)

manager = ConnectionManager()
