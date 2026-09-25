#!/usr/bin/env python3
"""Print bounded Kepler recovery context for a provider session-start hook."""

from __future__ import annotations

import json
import os
import subprocess
import sys


def main() -> int:
    session_id = os.environ.get("KEPLER_SESSION_ID")
    if not session_id:
        print("Kepler session is not assigned. Call kepler_bootstrap before project work.")
        return 0
    completed = subprocess.run(
        ["kepler", "--compact", "session", "resume", "--id", session_id],
        capture_output=True, text=True, check=False,
    )
    if completed.returncode != 0:
        print("Kepler resume failed. Stop task mutations and call kepler_bootstrap.")
        if completed.stderr:
            print(completed.stderr[-1000:], file=sys.stderr)
        return 0
    try:
        context = json.loads(completed.stdout)
    except json.JSONDecodeError:
        print("Kepler resume returned invalid data. Stop task mutations and diagnose the Hub.")
        return 0
    bounded = {
        "project": context.get("project"),
        "session": context.get("session"),
        "assignment": context.get("assignment"),
        "required_skills": context.get("required_skills"),
        "latest_checkpoint": context.get("latest_checkpoint"),
        "messages": context.get("messages", [])[:10],
        "version_vector": context.get("version_vector"),
        "stale_context": context.get("stale_context"),
        "next_action": context.get("next_action"),
    }
    print("Kepler Agent OS recovery context:\n" + json.dumps(bounded, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

