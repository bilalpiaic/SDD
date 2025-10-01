from __future__ import annotations
from typing import Any, Dict, Optional
from enum import Enum
from pydantic import BaseModel, Field


class ElementType(str, Enum):
    tile = "tile"
    card = "card"
    report_block = "report_block"
    module_group = "module_group"


class Position(BaseModel):
    x: int
    y: int
    width: int
    height: int


class WireframeElement(BaseModel):
    element_id: str
    element_type: ElementType
    data_source: Optional[str] = None
    display_data: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    position: Optional[Position] = None
    conversation_id: Optional[str] = None
