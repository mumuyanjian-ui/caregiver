#!/usr/bin/env python3

import argparse
import json
import os
import sys
import urllib.error
import urllib.request


API_URL = "https://api.tavily.com/search"


def load_api_key():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    key_path = os.path.normpath(
        os.path.join(base_dir, "..", ".secrets", "tavily.key")
    )

    try:
        with open(key_path, "r", encoding="utf-8") as f:
            raw = f.read().strip()

        if "=" in raw:
            left, right = raw.split("=", 1)
            if left.strip() == "TAVILY_API_KEY":
                return right.strip()

        return raw or None
    except FileNotFoundError:
        return None


def clamp_max_results(value: int) -> int:
    if value < 1:
        return 1
    if value > 10:
        return 10
    return value


def build_payload(args: argparse.Namespace, api_key: str) -> dict:
    payload = {
        "api_key": api_key,
        "query": args.query,
        "search_depth": args.depth,
        "topic": args.topic,
        "max_results": clamp_max_results(args.max_results),
        "include_answer": not args.no_answer,
        "include_raw_content": args.raw_content,
        "include_images": args.images,
    }

    if args.include_domains:
        payload["include_domains"] = args.include_domains

    if args.exclude_domains:
        payload["exclude_domains"] = args.exclude_domains

    return payload


def tavily_search(payload: dict, timeout: int = 30) -> dict:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=data,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            return json.loads(body)
    except urllib.error.HTTPError as exc:
        details = ""
        try:
            details = exc.read().decode("utf-8", errors="replace")
        except Exception:
            details = ""
        return {
            "success": False,
            "error": f"HTTP {exc.code}",
            "details": details,
        }
    except urllib.error.URLError as exc:
        return {
            "success": False,
            "error": "Network error",
            "details": str(exc.reason),
        }
    except Exception as exc:
        return {
            "success": False,
            "error": "Unexpected error",
            "details": str(exc),
        }


def print_human(result: dict) -> int:
    if not isinstance(result, dict):
        print("Error: invalid response format", file=sys.stderr)
        return 1

    if "error" in result and not result.get("results"):
        print(f"Error: {result.get('error')}", file=sys.stderr)
        if result.get("details"):
            print(result["details"], file=sys.stderr)
        return 1

    print(f"Query: {result.get('query', 'N/A')}")
    print(f"Response time: {result.get('response_time', 'N/A')}")
    usage = result.get("usage", {})
    if isinstance(usage, dict):
        print(f"Credits used: {usage.get('credits', 'N/A')}")
    print()

    answer = result.get("answer")
    if answer:
        print("=== ANSWER ===")
        print(answer)
        print()

    results = result.get("results", [])
    if results:
        print("=== RESULTS ===")
        for index, item in enumerate(results, start=1):
            title = item.get("title") or "No title"
            url = item.get("url") or "N/A"
            score = item.get("score")
            content = item.get("content") or ""

            print(f"\n{index}. {title}")
            print(f"   URL: {url}")

            if isinstance(score, (int, float)):
                print(f"   Score: {score:.3f}")

            if content:
                snippet = content[:280].replace("\n", " ").strip()
                if len(content) > 280:
                    snippet += "..."
                print(f"   {snippet}")

    images = result.get("images", [])
    if images:
        print(f"\n=== IMAGES ({len(images)}) ===")
        for image in images[:5]:
            if isinstance(image, dict):
                print(f"   {image.get('url', 'N/A')}")
            else:
                print(f"   {image}")

    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Tavily Search via direct REST API call",
    )

    parser.add_argument("--query", required=True, help="Search query")
    parser.add_argument(
        "--api-key",
        help="Tavily API key. If omitted, file or TAVILY_API_KEY is used.",
    )
    parser.add_argument(
        "--depth",
        choices=["basic", "advanced"],
        default="basic",
        help="Search depth",
    )
    parser.add_argument(
        "--topic",
        choices=["general", "news"],
        default="general",
        help="Search topic",
    )
    parser.add_argument(
        "--max-results",
        type=int,
        default=5,
        help="Number of results to return (1-10)",
    )
    parser.add_argument(
        "--no-answer",
        action="store_true",
        help="Do not request Tavily answer summary",
    )
    parser.add_argument(
        "--raw-content",
        action="store_true",
        help="Include parsed raw content",
    )
    parser.add_argument(
        "--images",
        action="store_true",
        help="Include image results",
    )
    parser.add_argument(
        "--include-domains",
        nargs="+",
        help="Only include these domains",
    )
    parser.add_argument(
        "--exclude-domains",
        nargs="+",
        help="Exclude these domains",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print raw JSON response",
    )

    args = parser.parse_args()

    api_key = load_api_key()
    if not api_key:
        print(
            "Error: Tavily API key not found in ../.secrets/tavily.key",
            file=sys.stderr,
        )
        return 1

    payload = build_payload(args, api_key)
    result = tavily_search(payload)

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
        return 0 if "error" not in result else 1

    return print_human(result)


if __name__ == "__main__":
    raise SystemExit(main())
