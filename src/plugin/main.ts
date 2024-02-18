import { Plugin } from 'obsidian'
import { VIEW_TYPE_VUE_TEST, VueTestView } from './view'
import { Pool } from 'pg'; 

export default class VueTestPlugin extends Plugin {
  dbPool: Pool | null = null;

  async onload() {
    this.registerView(VIEW_TYPE_VUE_TEST, leaf => new VueTestView(leaf))

    this.addCommand({
      id: 'show-vue-test-view',
      name: 'Show Vue Test View',
      callback: () => {
        this.activateView()
      },
    })

    await this.createView()

    this.dbPool = new Pool({
      connectionString: 'postgres://jrsljuby:RxdHL-JgOE3FbaMqYm-2mONIhKrpLFWF@mouse.db.elephantsql.com/jrsljuby',
    });

    if (this.dbPool) {
      await this.addSampleData();
      await this.querySampleData();
    }

  }

  async onunload() {
    this.findView()?.detach()
    if (this.dbPool) {
    await this.dbPool.end();
    }
  }

  findView() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_VUE_TEST)) {
      if (leaf.view instanceof VueTestView)
        return leaf
    }
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

  async addSampleData() {
    const text = 'INSERT INTO your_table(name, value) VALUES($1, $2)';
    const values = ['test', '123'];

    try {
      //@ts-ignore
      await this.dbPool.query(text, values);
      console.log('Sample data added');
    } catch (err) {
      console.error('Error adding sample data', err);
    }
  }

  // Example method to query data
  async querySampleData() {
    const text = 'SELECT * FROM your_table';

    try {
      //@ts-ignore
      const res = await this.dbPool.query(text);
      console.log('Query results:', res.rows);
    } catch (err) {
      console.error('Error querying data', err);
    }
  }
}
