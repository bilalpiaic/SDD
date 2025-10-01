import time
from src.services.nlp_service import NLPService


def test_nlp_interpret_under_2s():
    nlp = NLPService()
    start = time.perf_counter()
    for _ in range(10000):
        nlp.interpret("Generate a report for invoices in Q1")
    elapsed = time.perf_counter() - start
    # Extremely lenient threshold for placeholder; real model target <2s
    assert elapsed < 2.0
