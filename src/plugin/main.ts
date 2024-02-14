import { Plugin } from 'obsidian'
import { VIEW_TYPE_VUE_TEST, VueTestView } from './view'



export default class VueTestPlugin extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE_VUE_TEST, leaf => new VueTestView(leaf))

    this.addCommand({
      id: 'show-vue-test-view',
      name: 'Show Vue Test View',
      callback: () => {
        this.activateView()
      },
    })

    await this.loadDatabase() 



    await this.createView()
  }

  

  async onunload() {
    this.findView()?.detach()
  }

  findView() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_VUE_TEST)) {
      if (leaf.view instanceof VueTestView)
        return leaf
    }
  }

  async loadDatabase() {
    const sqlite = await import('node-sqlite3-wasm');
    const { Database } = sqlite;
    // Use sqlite.Database as needed
    const db = new Database("database.db");

db.exec(
  "DROP TABLE IF EXISTS employees; " +
    "CREATE TABLE IF NOT EXISTS employees (name TEXT, salary INTEGER)"
);

db.run("INSERT INTO employees VALUES (:n, :s)", {
  ":n": "James",
  ":s": 50000,
});

const r = db.all("SELECT * from employees");
console.log(r);
// [ { name: 'James', salary: 50000 } ]

db.close();
  }

  async createView() {
    const leaf = this.app.workspace.getLeftLeaf(false)

    await leaf.setViewState({ type: VIEW_TYPE_VUE_TEST, active: true })

    return leaf
  }

  async activateView() {
    const leaf = this.findView() ?? (await this.createView())

    this.app.workspace.revealLeaf(leaf)
  }
}
