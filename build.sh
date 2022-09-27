#!/bin/bash

mkdir -p dist
(
	echo '{"controllers":['
	first=1
	for j in src/*.json; do
		b="$(basename "$j" .json)"
		if [ "$b" == "_example" ]; then
			continue
		fi

		jq -M '.name as $name|[.bg as $defBg|.fg as $defFg|.buttons|keys[] as $k|.[$k] as {$type,$bg,$fg} ?// $type|{key:($k),value:{type:($type),bg:($bg // $defBg),fg:($fg // $defFg)}}]|from_entries|{name:$name,buttons:.}' "$j"
		if [ "$first" == "1" ]; then
			first=0
		else
			echo ','
		fi
	done
	echo '],"symbols":'
	cat symbols.json
	echo '}'
) | jq -acM 'del(..|.["_comment"]?)' > dist/symboliccontrollerdb.json
