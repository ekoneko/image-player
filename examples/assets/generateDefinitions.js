#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const _ = require('lodash')

const template = `declare const $name: string
export default $name
`

const svgFiles = glob.sync('**.svg', {
  cwd: path.join(__dirname),
})

const svgDefFiles = glob.sync('**.svg.d.ts', {
  cwd: path.join(__dirname),
})

svgFiles.forEach((svg) => {
  if (!svgDefFiles.includes(svg)) {
    fs.writeFileSync(`${svg}.d.ts`, template.replace(/\$name/g, _.camelCase(svg)))
  }
})
