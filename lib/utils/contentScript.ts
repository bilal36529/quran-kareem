// Modern ES module for content script functionality
interface ContentOptions {
  target: HTMLElement;
  content: string;
  delay?: number;
}

class ContentManager {
  private options: ContentOptions | null = null;

  async loadContent({ target, content, delay = 0 }: ContentOptions) {
    this.options = { target, content, delay };

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    target.innerHTML = content;
    return true;
  }

  clearContent() {
    if (this.options?.target) {
      this.options.target.innerHTML = '';
      this.options = null;
    }
  }
}

export const contentManager = new ContentManager();