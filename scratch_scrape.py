import urllib.request, re, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://silverpointprint.com/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, context=ctx, timeout=8) as r:
        html = r.read().decode('utf-8', errors='ignore')
        chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', html)
        print(f'Checking {len(chunks)} chunks...')
        for chunk in chunks:
            curl = 'https://silverpointprint.com' + chunk
            try:
                with urllib.request.urlopen(urllib.request.Request(curl, headers={'User-Agent': 'Mozilla/5.0'}), context=ctx, timeout=5) as cr:
                    cdata = cr.read().decode('utf-8', errors='ignore')
                    # Find all media urls
                    murls = re.findall(r'https://api\.silverpointprint\.com/media/[^\s"\'`)]+', cdata)
                    for mu in set(murls):
                        print('FOUND MEDIA:', mu)
            except Exception as ce:
                pass
except Exception as e:
    print('Failed:', e)
