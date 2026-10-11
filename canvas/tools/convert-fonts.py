from pathlib import Path
from fontTools.ttLib import TTFont
root=Path('/home/kepler/Desktop/portfolio-canvas-2026-10-04/fonts')
for source in root.glob('*.woff2'):
    font=TTFont(source)
    families=[n.toUnicode() for n in font['name'].names if n.nameID==1]
    if any(name.startswith('Manrope') for name in families):
        for record in font['name'].names:
            if record.nameID in (1,16):
                font['name'].setName('Manrope',record.nameID,record.platformID,record.platEncID,record.langID)
    font.flavor=None
    font.save(source.with_suffix('.ttf'))
print('Converted', len(list(root.glob('*.ttf'))), 'fonts to desktop TTF files')
