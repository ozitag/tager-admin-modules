import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { h } from "vue";

import BaseButton from "./BaseButton.vue";

/** The routes only have to exist; nothing renders them. */
const RouteStub = { render: () => h("div") };

function createTestRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: RouteStub },
      { path: "/dashboard", component: RouteStub },
    ],
  });
}

/** Without a router `useRouter()` returns undefined, which the component tolerates. */
function mountButton(props: Record<string, unknown> = {}, router?: Router) {
  return mount(BaseButton, {
    props,
    global: router ? { plugins: [router] } : {},
  });
}

describe("rendered element", () => {
  it("renders a button when no href is given", () => {
    const wrapper = mountButton();

    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("a").exists()).toBe(false);
  });

  it("renders an anchor once href is set", () => {
    const wrapper = mountButton({ href: "https://example.com" });

    expect(wrapper.find("a").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("uses distinct default slot text per element", () => {
    expect(mountButton().text()).toBe("Submit");
    expect(mountButton({ href: "https://example.com" }).text()).toBe(
      "Navigate"
    );
  });

  it("renders the provided slot content instead of the default", () => {
    const wrapper = mount(BaseButton, { slots: { default: "Save" } });

    expect(wrapper.text()).toBe("Save");
  });

  it("forwards the type attribute", () => {
    expect(
      mountButton({ type: "submit" }).find("button").attributes("type")
    ).toBe("submit");
  });
});

describe("class names", () => {
  it("defaults to the primary variant", () => {
    expect(mountButton().find("button").classes()).toContain("primary");
  });

  it("applies the requested variant", () => {
    expect(
      mountButton({ variant: "outline-secondary" }).find("button").classes()
    ).toContain("outline-secondary");
  });

  it("adds state classes only when the matching prop is set", () => {
    const plain = mountButton().find("button").classes();
    expect(plain).not.toContain("loading");
    expect(plain).not.toContain("disabled");

    expect(mountButton({ loading: true }).find("button").classes()).toContain(
      "loading"
    );
    expect(mountButton({ disabled: true }).find("button").classes()).toContain(
      "disabled"
    );
  });
});

describe("disabled state", () => {
  it("is enabled by default", () => {
    expect(mountButton().find("button").attributes("disabled")).toBeUndefined();
  });

  it("is disabled by the disabled prop", () => {
    expect(
      mountButton({ disabled: true }).find("button").attributes("disabled")
    ).toBeDefined();
  });

  it("is also disabled while loading", () => {
    expect(
      mountButton({ loading: true }).find("button").attributes("disabled")
    ).toBeDefined();
  });
});

describe("loading spinner", () => {
  it("is absent by default", () => {
    expect(mountButton().find(".spinner-wrapper").exists()).toBe(false);
  });

  it("appears while loading", () => {
    expect(
      mountButton({ loading: true }).find(".spinner-wrapper").exists()
    ).toBe(true);
  });
});

describe("click handling", () => {
  it("emits click", async () => {
    const wrapper = mountButton();

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("swallows the click when disabled", async () => {
    const wrapper = mountButton({ disabled: true });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("swallows the click while loading", async () => {
    const wrapper = mountButton({ loading: true });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("click")).toBeUndefined();
  });
});

describe("link behaviour", () => {
  it("routes internally instead of following a relative href", async () => {
    const router = createTestRouter();
    await router.push("/");
    const push = vi.spyOn(router, "push");

    const wrapper = mountButton({ href: "/dashboard" }, router);
    await wrapper.find("a").trigger("click");

    expect(push).toHaveBeenCalledWith("/dashboard");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("leaves an absolute href to the browser", async () => {
    const router = createTestRouter();
    await router.push("/");
    const push = vi.spyOn(router, "push");

    const wrapper = mountButton({ href: "https://example.com" }, router);

    // The component deliberately lets the browser handle an absolute href.
    // jsdom cannot navigate, so cancel the event right after the component's
    // own handler (registered first, therefore run first) has seen it.
    const anchor = wrapper.find("a").element;
    anchor.addEventListener("click", (event) => event.preventDefault());
    await wrapper.find("a").trigger("click");

    expect(push).not.toHaveBeenCalled();
    expect(wrapper.find("a").attributes("href")).toBe("https://example.com");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("resolves a relative href through the router", () => {
    const router = createTestRouter();
    const wrapper = mountButton({ href: "/dashboard" }, router);

    expect(wrapper.find("a").attributes("href")).toBe("/dashboard");
  });
});
