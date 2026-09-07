type Web3FormsPayload = Record<string, string>;

export function submitWeb3Form(payload: Web3FormsPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    const iframeName = `web3forms_${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.hidden = true;
    iframe.title = "web3forms";

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://api.web3forms.com/submit";
    form.target = iframeName;
    form.hidden = true;

    for (const [name, value] of Object.entries(payload)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    }

    let settled = false;
    let ready = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      form.remove();
      iframe.remove();
      if (ok) resolve();
      else reject(new Error("No pudimos enviar tu mensaje. Intenta por WhatsApp."));
    };

    const timeoutId = window.setTimeout(() => finish(false), 12000);

    iframe.addEventListener("load", () => {
      if (!ready) {
        ready = true;
        return;
      }
      finish(true);
    });

    document.body.append(iframe, form);
    form.requestSubmit();
  });
}
