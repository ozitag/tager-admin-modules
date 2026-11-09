import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";

import { i18nPlugin } from "@tager/admin-services";

import Modal from "./Modal.vue";

/** The close button reads its label through `useI18n`, which needs the plugin. */
const MOUNT_CONTEXT = {
  plugins: [i18nPlugin],
  stubs: { teleport: true },
};

/**
 * Teleport is stubbed so the dialog renders inside the wrapper; everything the
 * component does to `document` -- the Escape listener, the scroll lock, the
 * focus it hands back -- still happens for real.
 */
function mountModal(props: Record<string, unknown> = {}) {
  return mount(Modal, {
    props: { open: true, title: "Session 42", ...props },
    slots: { default: "<p>Body</p>" },
    attachTo: document.body,
    global: MOUNT_CONTEXT,
  });
}

function pressEscape(): void {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
}

const mounted: Array<VueWrapper> = [];

afterEach(() => {
  while (mounted.length > 0) {
    mounted.pop()?.unmount();
  }
});

function track<T extends VueWrapper>(wrapper: T): T {
  mounted.push(wrapper);
  return wrapper;
}

describe("rendering", () => {
  it("renders nothing while closed", () => {
    const wrapper = track(mountModal({ open: false }));

    expect(wrapper.find(".modal-overlay").exists()).toBe(false);
  });

  it("renders the title, the subtitle and the default slot once open", () => {
    const wrapper = track(mountModal({ subtitle: "snapshot 1091" }));

    expect(wrapper.find(".modal-title").text()).toBe("Session 42");
    expect(wrapper.find(".modal-subtitle").text()).toBe("snapshot 1091");
    expect(wrapper.find(".modal-body").text()).toBe("Body");
  });

  it("labels the dialog by its title", () => {
    const wrapper = track(mountModal());

    const titleId = wrapper.find(".modal-title").attributes("id");

    expect(wrapper.find('[role="dialog"]').attributes("aria-labelledby")).toBe(
      titleId
    );
  });

  it("falls back to aria-label when there is no title", () => {
    const wrapper = track(
      mountModal({ title: "", ariaLabel: "Import stages" })
    );

    expect(wrapper.find('[role="dialog"]').attributes("aria-label")).toBe(
      "Import stages"
    );
  });

  it("drops the header when nothing is left to put in it", () => {
    const wrapper = track(mountModal({ title: "", closable: false }));

    expect(wrapper.find(".modal-header").exists()).toBe(false);
  });
});

describe("closing", () => {
  it("emits close and update:open from the close button", async () => {
    const wrapper = track(mountModal());

    await wrapper.find(".modal-close").trigger("click");

    expect(wrapper.emitted("close")).toHaveLength(1);
    expect(wrapper.emitted("update:open")).toEqual([[false]]);
  });

  it("closes on Escape", () => {
    const wrapper = track(mountModal());

    pressEscape();

    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("keeps Escape to itself when close-on-escape is off", () => {
    const wrapper = track(mountModal({ closeOnEscape: false }));

    pressEscape();

    expect(wrapper.emitted("close")).toBeUndefined();
  });

  it("closes only the topmost modal on Escape", () => {
    const bottom = track(mountModal());
    const top = track(mountModal());

    pressEscape();

    expect(top.emitted("close")).toHaveLength(1);
    expect(bottom.emitted("close")).toBeUndefined();
  });

  it("closes on a click that both starts and ends on the overlay", async () => {
    const wrapper = track(mountModal());
    const overlay = wrapper.find(".modal-overlay");

    await overlay.trigger("mousedown");
    await overlay.trigger("click");

    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("ignores a click that started inside the dialog", async () => {
    const wrapper = track(mountModal());

    await wrapper.find(".modal-dialog").trigger("mousedown");
    await wrapper.find(".modal-overlay").trigger("click");

    expect(wrapper.emitted("close")).toBeUndefined();
  });

  it("ignores the overlay click when close-on-overlay-click is off", async () => {
    const wrapper = track(mountModal({ closeOnOverlayClick: false }));
    const overlay = wrapper.find(".modal-overlay");

    await overlay.trigger("mousedown");
    await overlay.trigger("click");

    expect(wrapper.emitted("close")).toBeUndefined();
  });
});

describe("page behind the modal", () => {
  it("locks the body scroll while open and restores it afterwards", async () => {
    document.body.style.overflow = "auto";

    const wrapper = track(mountModal());

    expect(document.body.style.overflow).toBe("hidden");

    await wrapper.setProps({ open: false });

    expect(document.body.style.overflow).toBe("auto");
  });

  it("keeps the lock until the last modal is gone", async () => {
    document.body.style.overflow = "";

    const bottom = track(mountModal());
    const top = track(mountModal());

    await top.setProps({ open: false });

    expect(document.body.style.overflow).toBe("hidden");

    await bottom.setProps({ open: false });

    expect(document.body.style.overflow).toBe("");
  });

  it("releases the lock when a modal is unmounted while still open", () => {
    document.body.style.overflow = "";

    mountModal().unmount();

    expect(document.body.style.overflow).toBe("");
  });
});

describe("focus", () => {
  it("moves focus into the dialog and hands it back on close", async () => {
    const opener = document.createElement("button");
    document.body.appendChild(opener);
    opener.focus();

    const wrapper = track(mountModal());
    await wrapper.vm.$nextTick();

    expect(document.activeElement).toBe(wrapper.find(".modal-dialog").element);

    await wrapper.setProps({ open: false });

    expect(document.activeElement).toBe(opener);

    opener.remove();
  });

  it("wraps Tab from the last focusable element back to the first", async () => {
    const wrapper = track(
      mount(Modal, {
        props: { open: true, title: "Session 42", closable: false },
        slots: {
          default:
            '<button class="first">One</button><button class="last">Two</button>',
        },
        attachTo: document.body,
        global: MOUNT_CONTEXT,
      })
    );

    // Окно забирает фокус на себя через nextTick -- это должно случиться до,
    // иначе оно отнимет фокус у кнопки уже после того, как тест его поставил.
    await wrapper.vm.$nextTick();

    const last = wrapper.find("button.last").element as HTMLElement;
    last.focus();

    await wrapper.find(".modal-dialog").trigger("keydown", { key: "Tab" });

    expect(document.activeElement).toBe(wrapper.find("button.first").element);
  });
});
