#!/bin/bash
cmd=$(jq -r '.tool_input.command')
pr_num=$(echo "$cmd" | grep -oE 'gh pr merge[[:space:]]+[0-9]+' | grep -oE '[0-9]+')
decision=$(gh pr view $pr_num --json reviewDecision -q .reviewDecision 2>/dev/null)

if [ "$decision" = "APPROVED" ]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow"}}'
else
  echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"PRがapproveされていません（reviewDecision=${decision:-none}）。レビュー承認後にマージしてください。\"}}"
fi
