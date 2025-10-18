# ALL TYPESCRIPT/ESLINT FIXES FOR VERCEL BUILD

## FILE 1: src/app/admin/dashboard/page.tsx
## Line 122: Change `any` to proper type
OLD: `const [admin, setAdmin] = useState<any>(null)`
NEW: `const [admin, setAdmin] = useState<{ email: string; name?: string } | null>(null)`

## Line 171: Remove unused err variable
OLD: `} catch (err) {`
NEW: `} catch {`

## Line 233: Remove unused err variable  
OLD: `} catch (err) {`
NEW: `} catch {`

## Line 349: Fix unescaped apostrophe
OLD: `<h3 className="text-sm text-gray-400 mb-2">Today's Cost</h3>`
NEW: `<h3 className="text-sm text-gray-400 mb-2">Today&apos;s Cost</h3>`

## Line 355: Fix unescaped apostrophe
OLD: `<h3 className="text-sm text-gray-400 mb-2">This Week's Cost</h3>`
NEW: `<h3 className="text-sm text-gray-400 mb-2">This Week&apos;s Cost</h3>`

---

## FILE 2: src/app/admin/login/page.tsx
## Line 57: Fix any type
OLD: `} catch (err: any) {`
NEW: `} catch (err: unknown) {`
OLD: `setError(err.message || 'Failed to sign in. Please try again.')`
NEW: `setError(err instanceof Error ? err.message : 'Failed to sign in. Please try again.')`

---

## FILE 3: src/app/dashboard/page.tsx
## Line 49: Fix any type (ALREADY FIXED)
## Line 75-76: Fix API URLs (ALREADY FIXED)
## Line 130: Fix API URL (ALREADY FIXED)

---

## FILE 4: src/app/login/page.tsx  
## Line 48: Fix any type (ALREADY FIXED)
## Line 85: Fix any type (ALREADY FIXED)
## Line 157: Fix apostrophe (ALREADY FIXED)
## Line 168: Fix apostrophe (ALREADY FIXED)

---

## FILE 5: src/app/page.tsx
## Line 3: Remove unused Link import (ALREADY FIXED)
## Line 15: Remove unused staggerContainer (ALREADY FIXED)
## Line 161: Fix apostrophe (ALREADY FIXED)
## Line 275: Fix apostrophe (ALREADY FIXED)

---

## FILE 6: src/app/signup/page.tsx
## Line 69: Fix any type (ALREADY FIXED)

---

## SUMMARY:
Most files are already fixed. You only need to upload the files that show as "modified" in your local directory. The key fixes are:

1. **admin/dashboard/page.tsx** - 5 fixes
2. **admin/login/page.tsx** - 2 fixes

These are the files that need to be uploaded to GitHub to fix the Vercel build.
