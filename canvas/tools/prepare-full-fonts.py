from pathlib import Path
from fontTools.ttLib import TTFont
root=Path('/home/kepler/Desktop/portfolio-canvas-2026-10-04/fonts/full')
source=root/'Manrope-Variable.ttf'
font=TTFont(source)
for record in font['name'].names:
    if record.nameID in (1,16):
        font['name'].setName('Manrope',record.nameID,record.platformID,record.platEncID,record.langID)
font.save(source)
print('Prepared full Manrope family for desktop resolution')
