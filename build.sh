#!/bin/bash

mkdir -p dist
(
	echo '# Symbolic Controller DB' >&2
	echo '# Source: https://github.com/unascribed/SymbolicControllerDB' >&2
	echo >&2
	echo '{'
	for j in src/*.json; do
		b="$(basename "$j" .json)"
		if [ "$b" == "_example" ]; then
			continue
		fi
		echo -n "$b," >&2
		jq -jM '"\(.name),",.bg as $defBg|.fg as $defFg|.buttons|keys[] as $k|.[$k] as {$type,$bg,$fg} ?// $type|"\($k):\($type):\($bg // $defBg):\($fg // $defFg),"' "$j" >&2

		echo "\"$b\": "
		jq -M '.name as $name|[.bg as $defBg|.fg as $defFg|.buttons|keys[] as $k|.[$k] as {$type,$bg,$fg} ?// $type|{key:($k),value:{type:($type),bg:($bg // $defBg),fg:($fg // $defFg)}}]|from_entries|{name:$name,buttons:.}' "$j"
		echo ','
	done
	echo '"_comment":""}'
) 2>dist/symboliccontrollerdb.txt | jq -acM 'del(..|.["_comment"]?)' > dist/symboliccontrollerdb.json

jq -acM 'del(..|.["_comment"]?)' symbols.json > dist/symboliccontrollerdb-symbols.json
