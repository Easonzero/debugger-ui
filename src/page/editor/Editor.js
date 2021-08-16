import React, { useMemo } from "react";
import CodeMirror from 'rodemirror'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDark } from '@codemirror/theme-one-dark'
import { StreamLanguage } from "@codemirror/stream-parser"
import { toml } from "@codemirror/legacy-modes/mode/toml"

export const Editor = () => {
    const extensions = useMemo(() => [basicSetup, oneDark, StreamLanguage.define(toml)], [])
    return (<CodeMirror extensions={extensions} />)
}
