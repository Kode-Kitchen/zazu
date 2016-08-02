const { BrowserWindow, dialog } = require('electron')
const globalEmitter = require('../lib/globalEmitter')
const Update = require('../lib/update')

const toggleDevTools = () => {
  const currentWindow = BrowserWindow.getFocusedWindow()
  if (currentWindow) {
    currentWindow.toggleDevTools()
  } else {
    dialog.showMessageBox({
      type: 'error',
      message: 'No focused window',
      detail: 'There are currently no focused windows.',
      buttons: ['Ok'],
    })
  }
}

const appTemplate = [
  {
    label: 'Zazu',
    submenu: [
      { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
      { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'Command+A', selector: 'selectAll:' },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: toggleDevTools,
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          globalEmitter.emit('quitApp')
        },
      },
    ],
  },
]

const trayTemplate = [
  {
    label: 'Toggle Zazu',
    click () {
      globalEmitter.emit('toggleWindow')
    },
  },
  { type: 'separator' },
  {
    label: 'About Zazu',
    click () {
      globalEmitter.emit('showAbout')
    },
  },
  { type: 'separator' },
  {
    label: 'Development',
    submenu: [
      {
        label: 'Plugin Debugger',
        click () {
          globalEmitter.emit('showDebug')
        },
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: toggleDevTools,
      },
    ],
  },
  { type: 'separator' },
  {
    label: 'Check for Zazu Updates',
    click: () => {
      const update = new Update()
      update.check(true)
    },
  },
  {
    label: 'Update installed Plugins',
    click: () => {
      globalEmitter.emit('updatePlugins')
    },
  },
  { type: 'separator' },
  {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click: () => {
      globalEmitter.emit('quitApp')
    },
  },
]

module.exports = { trayTemplate, appTemplate }