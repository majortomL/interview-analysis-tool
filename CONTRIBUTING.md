# Contributing

Thank you for helping improve Interview Analysis Tool.

1. Open an issue describing the bug or proposed change.
2. Create a focused branch and include tests for behavior changes.
3. Run `ruff check .`, `pytest`, and `python -m build`.
4. Open a pull request explaining user-visible and schema implications.

Never commit real interview recordings, transcripts, consent forms, participant metadata, project exports, or secrets. Use small synthetic fixtures only.

Schema changes must either remain backward compatible or include an explicit migration and regression test.

