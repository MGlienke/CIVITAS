#!/usr/bin/env python3
"""Precompile approved Markdown/YAML front matter into auditable JSON without changing source."""
import hashlib,json,pathlib,re
import yaml
base=pathlib.Path(__file__).resolve().parents[1]
folder=base/'rules'
manifest={'codigo':'MARCO_A','versao':'0.1.0','esquema_versao':'0.1','arquivos':[]}
for name in ('CM-01','CM-02','CM-03','CM-04','MARCO_A'):
    file=folder/f'{name}.md'; raw=file.read_bytes(); content=raw.decode('utf-8')
    match=re.match(r'^---\s*\n(.*?)\n---\s*\n',content,re.S)
    if not match: raise ValueError(f'{name}: YAML front matter ausente')
    value=yaml.safe_load(match.group(1))
    if value['id'] != name or value['situacao'] != 'HOMOLOGADA': raise ValueError(f'{name}: ID ou situacao invalida')
    out=(folder/f'{name}.json');out.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    manifest['arquivos'].append({'id':name,'markdown':file.name,'json':out.name,'sha256':hashlib.sha256(raw).hexdigest(),'json_sha256':hashlib.sha256(out.read_bytes()).hexdigest()})
assert sum(len(yaml.safe_load(re.match(r'^---\s*\n(.*?)\n---\s*\n',(folder/f'{i}.md').read_text(),re.S).group(1))['requisitos']) for i in ('CM-01','CM-02','CM-03','CM-04'))==23
serialized=json.dumps(manifest,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()
manifest['hash_sha256']=hashlib.sha256(serialized).hexdigest()
(folder/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Regra compilada: 5 arquivos, 23 requisitos, SHA256:',manifest['hash_sha256'])
