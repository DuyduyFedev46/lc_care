# Báo Cáo: Workflow System của Google Antigravity SDK

> **Ngày**: 25/07/2026  
> **Người tổng hợp**: AI Assistant (Antigravity IDE)  
> **Nguồn**: Plugin `google-antigravity-sdk` v0.0.4 — 7 reference docs, 12 examples

### Đường dẫn tài liệu gốc

**Skill entry point:**
- `~/.gemini/config/plugins/google-antigravity-sdk/skills/google-antigravity-sdk/SKILL.md`

**References (7 files):**
- `~/.gemini/config/plugins/google-antigravity-sdk/references/architecture.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/references/agent_configuration.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/references/mcp_integration.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/references/safety_policies.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/references/error_handling.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/references/observability.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/references/built_in_tools.md`

**Examples (12 files):**
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/hello_world.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/custom_tool.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/persona_config.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/multimodal.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/subagents.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/mcp_tools.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/periodic_trigger.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/hooks.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/persistence.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/app_data_dir_override.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/structured_output.md`
- `~/.gemini/config/plugins/google-antigravity-sdk/examples/getting_started/agent_skills.md`

**Plugin config:**
- `~/.gemini/config/plugins/google-antigravity-sdk/plugin.json`

---

## 1. Tổng Quan

Google Antigravity (AGY) SDK là bộ công cụ Python cho phép thiết kế, triển khai và gỡ lỗi **autonomous AI agents** và **multi-agent systems**. SDK sử dụng Gemini models làm backbone.

**Package**: `google-antigravity`  
**Auth**: `GEMINI_API_KEY` (từ [Google AI Studio](https://aistudio.google.com/app/api-keys))  
**Default model**: `gemini-3.5-flash`

---

## 2. Kiến Trúc — Ba Trụ Cột

SDK được xây dựng trên 3 thành phần cốt lõi:

| # | Thành phần | Vai trò | Trách nhiệm |
|---|-----------|---------|-------------|
| 1 | **Agent** | Entry point / Orchestrator | Config (models, tools, policies), quản lý session lifecycle, điều phối hooks & triggers |
| 2 | **Conversation** | Stateful Session | Duy trì step history, tracking turns, context compaction, cung cấp streaming (`chat()`) |
| 3 | **Connection** | Transport Layer | Gửi prompts / nhận execution steps, tách biệt API level khỏi transport details (local/cloud) |

### Mối quan hệ:

```
User → Agent (config) → Conversation (state) → Connection (transport) → Gemini Model
```

1. User define `LocalAgentConfig` (model, tools, policies, hooks, triggers, skills)
2. `Agent` khởi tạo với config, tạo `Conversation`, chọn connection strategy
3. `Conversation` duy trì message history, quản lý turn-by-turn flow
4. `Connection` truyền dữ liệu đến backend, stream response về

---

## 3. Execution Flow — Quy Trình Thực Thi

### 3.1 Luồng chính

```
agent.chat("prompt")
  → Pre-Turn Hook
  → Conversation gửi qua Connection → Gemini Model
  → Model trả về response + tool calls
  → [Tool Execution Loop]
      → Pre-Tool-Call Hook (decide: allow/deny)
      → Policy Check (allow/deny/ask_user)
      → Execute tool
      → Post-Tool-Call Hook
      → (Nếu lỗi) On-Tool-Error Hook → fallback hoặc propagate
      → Gửi tool result lại cho Model
      → Model tiếp tục generate
  → Post-Turn Hook
  → Return final response
```

### 3.2 Cách tương tác

| Phương thức | Mô tả |
|-------------|--------|
| `await agent.chat("...")` | Gửi message, nhận response |
| `await response.text()` | Lấy full text response |
| `async for token in response` | Stream tokens real-time |
| `async for thought in response.thoughts` | Stream reasoning/thinking process |
| `await agent.run_interactive_loop()` | Terminal interactive chat (chỉ cho human, không dùng trong automation) |

---

## 4. Lifecycle Hooks — 8 Điểm Chặn

Hooks cho phép intercept, observe, modify và block ở mọi phase trong lifecycle.

### 4.1 Session Hooks

| Hook | Khi nào | Dùng để |
|------|---------|---------|
| `@hooks.on_session_start` | Agent session bắt đầu | Setup, logging, init resources |
| `@hooks.on_session_end` | Agent session kết thúc | Cleanup, reporting, release resources |

### 4.2 Turn Hooks

| Hook | Khi nào | Return | Dùng để |
|------|---------|--------|---------|
| `@hooks.pre_turn` | Trước 1 turn | `HookResult(allow=True/False)` | Inspect/reject prompt |
| `@hooks.post_turn` | Sau 1 turn | Nhận final content | Audit, logging response |

### 4.3 Tool Hooks

| Hook | Khi nào | Return | Dùng để |
|------|---------|--------|---------|
| `@hooks.pre_tool_call_decide` | Trước tool execute | `HookResult(allow=True/False)` | Gate tool execution |
| `@hooks.post_tool_call` | Sau tool hoàn tất | Observe result | Audit logging |
| `@hooks.on_tool_error` | Tool fail | Fallback string hoặc `None` | Error recovery |

### 4.4 Other Hooks

| Hook | Khi nào | Dùng để |
|------|---------|---------|
| `@hooks.on_interaction` | Agent cần user input | Handle interactive questions |
| `@hooks.on_compaction` | Context compaction xảy ra | Observe/log |

### Đăng ký hooks:

```python
config = LocalAgentConfig(
    hooks=[on_start, on_end, pre_turn, post_turn, 
           pre_tool, post_tool, on_error, on_compact, on_interact],
)
```

---

## 5. Safety Policy System — Hệ Thống Access Control

### 5.1 Thứ tự ưu tiên (cao → thấp)

```
1. Specific Deny    → policy.deny("tool_name")
2. Specific Ask     → policy.ask_user("tool_name", handler=...)
3. Specific Allow   → policy.allow("tool_name")
4. Wildcard Deny    → policy.deny("*")
5. Wildcard Ask     → policy.ask_user("*", handler=...)
6. Wildcard Allow   → policy.allow("*")
```

Trong mỗi priority group: **first match wins** (short-circuit evaluation).

### 5.2 Default Behavior

- `run_command` → **DENIED** (qua `confirm_run_command()`)
- Tất cả tools khác → **ALLOWED**
- Nếu set `workspaces` → auto thêm `workspace_only()` (restrict file tools)

### 5.3 Predicates (Conditional Policies)

```python
# Deny xóa file
policy.deny(
    "run_command",
    when=lambda args: "rm" in args.get("CommandLine", ""),
    name="deny_rm",
)
```

> **⚠️ Quan trọng**: Nếu predicate raise exception → **fails closed** (treat as match). Đây là security-first design.

### 5.4 Các Template Chuẩn

| Template | Use case | Config |
|----------|----------|--------|
| **Deny by Default** | Production | `deny_all()` + selective `allow()` |
| **Safe Default** | Phần lớn trường hợp | Không set gì (default) |
| **Allow All** | Development only | `policy.allow_all()` |

---

## 6. Tool System — Hệ Thống Công Cụ

### 6.1 Built-in Tools (11 tools)

| Tool | Tên thực thi | Mô tả |
|------|-------------|--------|
| `LIST_DIR` | `list_directory` | List nội dung directory |
| `SEARCH_DIR` | `search_directory` | Search trong directories |
| `FIND_FILE` | `find_file` | Tìm file theo tên |
| `VIEW_FILE` | `view_file` | Xem nội dung file |
| `CREATE_FILE` | `create_file` | Tạo file mới |
| `EDIT_FILE` | `edit_file` | Sửa file |
| `RUN_COMMAND` | `run_command` | Chạy shell command |
| `ASK_QUESTION` | `ask_question` | Hỏi user |
| `START_SUBAGENT` | `start_subagent` | Spawn subagent |
| `GENERATE_IMAGE` | `generate_image` | Tạo/sửa hình ảnh |
| `FINISH` | `finish` | Kết thúc và trả output |

### 6.2 Custom Tools

Define Python function + docstring → agent auto-discovers:

```python
def get_temperature(location: str) -> str:
    """Gets the current temperature for a given location.
    Args:
        location: The city, e.g. "Hanoi, VN".
    """
    return f"Temperature in {location} is 32°C."

config = LocalAgentConfig(tools=[get_temperature])
```

**Stateful tools** với `ToolContext`:

```python
def record_item(name: str, count: int, ctx: ToolContext) -> str:
    """Records items. Args: name, count, ctx (injected)."""
    state = ctx.get_state("items", {})
    state[name] = state.get(name, 0) + count
    ctx.set_state("items", state)
    return f"Total {name}: {state[name]}"
```

### 6.3 MCP Integration

| Transport | Cách hoạt động | Khi nào dùng |
|-----------|----------------|-------------|
| **Stdio** | SDK quản lý lifecycle MCP server process | Local development |
| **SSE** | Connect remote MCP server qua Server-Sent Events | Production / remote services |

> **Lưu ý**: Tools từ MCP server auto-register, nhưng cần **policy grant**: `policy.allow("mcp(server/*)")`

---

## 7. Advanced Features

### 7.1 Subagents (Multi-Agent Delegation)

```python
config = LocalAgentConfig(
    capabilities=types.CapabilitiesConfig(enable_subagents=True)
)
# Main agent tự spawn subagent qua prompt
# Output subagent → aggregate vào main response
```

### 7.2 Triggers (Event-Driven)

| Loại | Helper | Mô tả |
|------|--------|--------|
| **Periodic** | `every(seconds, callback)` | Timer-based, lặp lại |
| **File Change** | `on_file_change(path, callback)` | Watch filesystem (cần `watchfiles`) |
| **Custom** | Async function tùy ý | Custom polling logic |

```python
config = LocalAgentConfig(
    triggers=[timer_trigger, file_trigger, custom_trigger],
)
```

### 7.3 Conversation Persistence

```python
# Session 1: Lưu
config1 = LocalAgentConfig(save_dir="/path/to/save")
async with Agent(config1) as agent:
    await agent.chat("Remember: my name is Duyên.")
    conv_id = agent.conversation_id

# Session 2: Resume
config2 = LocalAgentConfig(conversation_id=conv_id, save_dir="/path/to/save")
async with Agent(config2) as agent:
    response = await agent.chat("What is my name?")  # → Duyên
```

### 7.4 Structured Output

```python
class MeetingSummary(pydantic.BaseModel):
    action_items: list[ActionItem]

config = LocalAgentConfig(response_schema=MeetingSummary)
# response.structured_output() → parsed JSON dict
```

### 7.5 Skills Loading

```python
config = LocalAgentConfig(skills_paths=["/path/to/skills"])
# Auto-discover SKILL.md files theo Agent Skills specification
```

### 7.6 System Instructions / Persona

| Phương thức | Mô tả |
|-------------|--------|
| String | Append thêm vào default instructions |
| `TemplatedSystemInstructions(identity=...)` | Set identity nhưng giữ default safety |
| `CustomSystemInstructions(text=...)` | **Thay thế hoàn toàn** (cẩn thận!) |

---

## 8. Error Recovery

### Exception Types

| Exception | Nguyên nhân |
|-----------|------------|
| `AntigravityValidationError` | Invalid params/config |
| `AntigravityConnectionError` | WebSocket drop/timeout |

### Recovery Pattern

```python
class FallbackHook(hooks.OnToolErrorHook):
    async def run(self, context, data):
        if isinstance(data, ValueError):
            return "[Fallback: please try with different parameters.]"
        return None  # Let error propagate

config = LocalAgentConfig(hooks=[FallbackHook()])
```

Agent nhận fallback string thay vì raw error → có thể **self-correct** và tiếp tục conversation.

---

## 9. Observability — Giám Sát

| Layer | Cơ chế | Thông tin |
|-------|--------|----------|
| **Token Tracking** | `agent.conversation.total_usage` | prompt, candidates, thinking, cached, total tokens |
| **Standard Logging** | `logging.getLogger("google.antigravity")` | Session start/stop, connection, tool execution |
| **Custom Tracing** | `PostToolCallHook`, `PreToolCallDecideHook` | Audit logs, execution traces tùy chỉnh |

> **⚠️**: `thoughts_token_count` có thể tăng lớn bất ngờ với thinking models. Luôn monitor.

---

## 10. So Sánh: Antigravity IDE vs AGY SDK

| Khía cạnh | Antigravity IDE (đang dùng) | AGY SDK (tự build) |
|-----------|---------------------------|-------------------|
| Agent | Pre-configured bởi Google | Tự define `LocalAgentConfig` |
| Tools | 15+ built-in (view_file, run_command, grep_search...) | 11 built-in + custom + MCP |
| Policies | Per-tool permission (ask_permission UI) | Declarative policy code |
| Hooks | Planning mode, artifacts, knowledge items | 8 programmable lifecycle hooks |
| Skills | Auto-discovered từ `.gemini/config/skills/` | `skills_paths` parameter |
| Subagents | Built-in | `enable_subagents=True` |
| Triggers | `schedule` tool (cron/timer) | `every()`, `on_file_change()`, custom |
| Persistence | Conversation transcripts (JSONL) | `save_dir` + `conversation_id` |

---

## 11. Kết Luận

Google Antigravity SDK thiết kế theo các nguyên tắc:

1. **Declarative-first**: Mọi thứ qua `LocalAgentConfig`
2. **Hook-driven**: 8 lifecycle hooks cho full control
3. **Policy-as-code**: Safety policies với priority resolution và fail-closed
4. **Composable**: Custom tools + MCP + Skills + Subagents
5. **Event-driven**: Triggers cho proactive agents
6. **Observable**: Token tracking + logging + hook-based tracing

SDK phù hợp cho việc build custom AI agents phục vụ các workflow tự động, từ đơn giản (chatbot) đến phức tạp (multi-agent orchestration với MCP integration).

---

*Báo cáo được tạo tự động bởi Antigravity IDE Agent.*
