from __future__ import annotations
from typing import Dict


class NLPService:
    """Placeholder NLP service for Phase 3.3.
    Will be replaced by real intent classification and parameter extraction.
    """

    def interpret(self, text: str) -> Dict[str, str]:
        text_l = (text or "").lower()
        if "invoice" in text_l:
            return {"intent": "invoices.search"}
        if "report" in text_l:
            return {"intent": "reports.generate"}
        return {"intent": "generic.query"}
