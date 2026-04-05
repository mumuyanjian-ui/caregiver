const OpenAI = require("openai");

function buildSystemPrompt(scene) {
  const base =
    "你是一个潮汕文旅小程序中的 AI 助手。你的回答要简洁、可信、好执行，适合旅游用户直接拿去安排行程。请尽量结构化输出，优先给出顺路建议、本地美食、文化亮点和避坑提醒。";

  const prompts = {
    itinerary:
      "用户需要路线建议。请输出：1. 推荐行程安排 2. 每段路线的理由 3. 适合停留的时长 4. 交通和时间提醒。",
    food:
      "用户需要美食推荐。请输出：1. 推荐吃什么 2. 适合在哪一带吃 3. 建议的用餐顺序 4. 排队或口味提醒。",
    culture:
      "用户需要文化解读。请输出：1. 景点或习俗的看点 2. 为什么值得去 3. 更有体验感的参观方式 4. 容易忽略的小细节。"
  };

  return `${base}\n${prompts[scene] || prompts.itinerary}`;
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
              `旅行天数：${event.travelDays || "未填写"}\n` +
              `偏好目的地：${event.selectedDestination || "未指定"}\n` +
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

