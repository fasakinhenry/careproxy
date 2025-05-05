import requests

url = "https://healthstartup.vercel.app/"
res = requests.get(url)
print(res.text)
