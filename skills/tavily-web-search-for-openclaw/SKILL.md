---
name: tavily
description: use this when the user asks to search the web, look up recent information, check current events, gather online sources, or research a topic using tavily search.
---

# Tavily Search

Use this skill for web search and lightweight research through the Tavily Search API.

## Requirements

A valid Tavily API key must be available through one of these methods:

1. `--api-key`
2. `TAVILY_API_KEY`
3. `{baseDir}/.secrets/tavily.key`

If no key is available, explain that Tavily search is not configured in this environment.

## Command

Run:

```bash
python3 {baseDir}/scripts/tavily_search.py --query "<user query>"
