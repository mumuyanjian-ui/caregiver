const OpenAI = require("openai");

function buildSystemPrompt(scene) {
  const base =
    "你是一个医疗陪诊类小程序中的 AI 助手。你的回答必须简洁、清晰、结构化，适合普通用户阅读。你不能替代医生做诊断，也不能做高风险医疗决策。对紧急症状必须提醒尽快线下就医或急诊。";

  const prompts = {
    triage:
      "用户需要根据症状初步判断挂号方向。请输出：1. 推荐科室 2. 推荐理由 3. 需要尽快就医的风险提醒 4. 建议携带资料。",
    prep:
      "用户需要就医准备建议。请输出：1. 出门前准备清单 2. 到院后优先做什么 3. 容易遗漏的资料 4. 陪诊建议。",
    explain:
      "用户需要对检查结果或医学术语做通俗解释。请输出：1. 通俗解释 2. 可能需要问医生的问题 3. 复诊/检查建议 4. 风险提醒。禁止下确定性诊断。"
  };

  return `${base}\n${prompts[scene] || prompts.triage}`;
}

exports.main = async (event) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    throw new Error("云函数未配置 OPENAI_API_KEY");
  }

  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: buildSystemPrompt(event.scene) }]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              `用户年龄：${event.patientAge || "未填写"}\n` +
              `目标医院：${event.selectedHospital || "未指定"}\n` +
              `用户输入：${event.inputText || ""}\n\n` +
              `业务知识库：\n${event.knowledge || ""}`
          }
        ]
      }
    ]
  });

  return {
    output_text: response.output_text || ""
  };
};
