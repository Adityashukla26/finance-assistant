import os
path = 'html/index_files/page.js.download'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("AIzaSyBhNlnKyw8xOP9_2KKiV6vTwa_OMccIiRI", "AIzaSyAyV_Ws3CeZKwFYP59jlfzaJExrm3dyHKc")
content = content.replace('fetch("/api/submit-form"', 'Promise.resolve({ok:true, json:()=>Promise.resolve({success:true})}) || fetch("/api/submit-form"')
content = content.replace("gemini-2.5-flash-preview-05-20", "gemini-2.0-flash")
content = content.replace("gemini-1.5-flash", "gemini-2.0-flash")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully patched {path}")
