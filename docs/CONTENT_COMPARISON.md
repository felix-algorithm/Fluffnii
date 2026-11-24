# FluffNii Studio — Content Comparison & Humanize-Writing Verification

This document records the Before vs. After copy audit across FluffNii Studio (EN & VI) after applying the 3-pass `humanize-writing` workflow (`SKILL.md`, `references/ai-patterns-dictionary.md`, and `references/voices.md`) in the **warm-professional** craftsperson voice tailored to a solo independent fursuit workshop.

## Files Updated & Created

- `src/lib/homeCopy.ts` — Rewrote EN & VI homepage copy while preserving every exported TypeScript type/interface, `localizeCommissionNote`, `SURFACE_HEX`, `META` arrays, `SHARED_CHANNELS`, and exact `commissionGroups` option values (`"Only body"`, `"Half-body"`, `"Fullsuit"`).
- `src/lib/accessoriesCopy.ts` — Rewrote EN & VI `/accessories` copy while preserving `formatVnd`, all exported TypeScript types, item IDs/codes/statuses, VND pricing (`250,000 VND`, `500,000 VND`), and `@CrossTalk_f` order/bundle flows.
- `src/lib/studioExtraCopy.ts` — New centralized copy module exporting typed EN & VI data and labels for `Deroule` (`TIMELINE_STEPS`, `TIMELINE_META`, `DEFAULT_ETAPES_EN`, `DEFAULT_ETAPES_VI`), `FAQAccordion` (`FAQ_ITEMS`, `DEFAULT_FAQS_EN`, `DEFAULT_FAQS_VI`), `TermsContent` (`TERMS_COPY`), and `LegalContent` (`LEGAL_COPY`).
- `docs/CONTENT_COMPARISON.md` — This comparison and verification record.

---

## 1. Homepage (`src/lib/homeCopy.ts`) — Before vs. After

### English (`en`)

| Section / Key | Before | After | Why & What Changed |
|---|---|---|---|
| `heroDesc` | We build custom fursuits straight from your ref sheet, with room to breathe and move. | We pattern custom fursuits straight from your ref sheet, built so you can actually breathe and move in them. | Direct craftsperson phrasing ("pattern", "actually breathe") without bloating width. |
| `phraseText` (+ highlights) | At FluffNii, we build fursuits you can wear all day on the con floor. Each head starts with plenty of airflow and clear sightlines, then we hand-pattern every marking and shave the cheeks smooth. | At FluffNii, we build fursuits meant to last all day on the con floor. Each head is shaped around real airflow and forward vision first, before we tape every marking by hand and shave the cheeks down smooth. | More concrete bench language ("tape every marking by hand", "shave the cheeks down smooth"); updated `phraseHighlights1` & `phraseHighlights2` to stay 100% token-aligned with `PhraseScroll`. |
| `formulaLead` | A suit that still looks like your OC the moment you put it on, with room inside to breathe. | A suit that still reads like your OC the second you put it on, without trapping heat inside. | Concrete heat-trapping problem instead of vague phrasing. |
| `formulaBody*` | We pattern straight off your ref sheet so every spot, ear notch, and color break lands in place. Most of our time goes into even shaving, **solid seams**, and carving a head you can wear for hours at a con without feeling boxed in. | We tape the pattern right off your ref sheet so small spots and ear notches land where you drew them. And most of our bench hours go into slow, even shaving, **solid seams**, plus hollowing out enough breathing room for long con afternoons. | Broke the 3-item tricolon (`spot, ear notch, and color break`), started sentence 2 with `"And"`, added concrete `"bench hours"`. |
| `pillars[0]` | We carve foam and 3D bases around balanced cheeks and wide forward sightlines so the ears sit right from every angle. | Cheeks and ear tilt get sculpted from multiple angles on foam or 3D bases alongside muzzle depth. Forward sightlines stay open so you can see where you walk. | Split into two sentences; replaced repetitive `"We [verb] ... so ..."` mirror structure across the 3 pillar cards. |
| `pillars[1]` | We tape dense faux fur straight onto the shell, sew tight seams, and shave the pile down so markings read cleanly. | Dense faux fur goes straight onto the taped pattern for tight seams. Then we shave the pile down in passes until every marking edge looks crisp. | Broke the 3-verb tricolon (`tape, sew, shave`); added workshop process detail (`in passes`). |
| `pillars[2]` | Sweat-wicking liner with hidden vents keeps the inside cool, plus a Velcro tongue and washable padding (magnetic add-ons optional). | Sweat-wicking fabric and hidden vents keep air moving inside the head. You also get washable padding and a Velcro tongue, with magnetic add-ons if you want them. | Clearer two-sentence rhythm; avoided parenthetical crowding. |
| `whoDesc` | Bears, lions, fox-cats, dogs, shibas. Every ref sheet carries its own proportions, so we shape each base to match rather than forcing one template. | Bears, lions, fox-cats, dogs, or shibas. One template never fits two species well, so we adjust the base proportions for each ref sheet. | Removed `"rather than"` negation contrast; states maker opinion directly. |
| `fanCards[0..4]` | `Round ears and full cheeks around a soft, wide muzzle.` / `Layered mane tufts over a strong brow ridge that holds up from the side.` / `Tall fox ears on a short cat muzzle for a rounded Kemono profile.` / `Perky ears and an upturned nose matched with a bouncy tail.` / `Sharp urajiro cheek markings under pointed ears, plus a curled tail that holds its arc.` | `Round ears set wide over soft cheeks and a broad muzzle.` / `Layered mane tufts framed by a heavier brow that holds its shape in profile.` / `Tall fox ears balanced over a short cat muzzle for that soft Kemono look.` / `Upbeat ears and a slight nose tilt, usually paired with a wag-ready tail.` / `Crisp urajiro cheeks under pointed ears. The curled tail keeps its arc all day.` | Varied phrasing and sentence structure across cards while staying within fixed `560px` card height (`<= 80` chars). |
| `resultDesc` | Turning flat character art into a wearable head comes down to base volume, shave depth, and smart seam placement. | Taking flat character art into three dimensions mostly comes down to getting the base volume right, then matching shave depth to clean seam placement. | Eliminated 3-item tricolon (`base volume, shave depth, and smart seam placement`). |
| `resultCards[0..3]` | `Every stripe, spot, and ear notch... so nothing drifts.` / `Full rounded cheeks... whether you face...` / `Swap moods easily with our standard Velcro tongues and eyelids, posable ears, or optional magnetic upgrades.` / `Wide forward vision and a hidden back zipper make suiting easy, while the cooling liner holds up through long con days.` | `Markings and ear notches get taped directly onto the base from your ref sheet. Nothing drifts out of place.` / `Deep-set 3D follow-me eyes sit tucked behind full cheeks. The face keeps its expression head-on and in side profile.` / `Velcro tongues and eyelids come standard for quick mood swaps. You can also add posable ears or magnetic parts.` / `A hidden back zipper makes putting the head on simple. Inside, wide vision and breathable lining hold up for hours.` | Broke tricolons and parallel `"so/while"` card endings; stayed well inside fixed `h-[340px]` card bounds (`<= 116` chars). |
| `methodDesc` & `methodSteps[0..2]` | 3-verb tricolons (`taped, sewn, shaved`; `finish, stuff, tune`) and `wide follow-me eyes, open mouth airflow, and clear forward vision`. | Split into varied two-sentence stages; starts `methodDesc` sentence 2 with `"And"`; replaced tricolons with concrete actions (`not guessing where the stairs are at a con`, `stuffed firm so they keep their bounce`). | Eliminated all 3-item verbs/nouns while preserving pills & WIP check-in promise. |
| `projects` (`summary` & `review`) | Summaries used repetitive `"matched with"` / `"finished with"` endings; client reviews by `Sy tray`, `Felix`, and `Umbréon Retsquôt`. | Varied project summaries (`Big amber eyes sit above...`, `Built with...`, `Comes with...`, `A braided ear cord...`). Preserved real client `review` quotes verbatim. | Kept attributed client testimonials authentic; tightened summaries. |
| `galleryDesc`, `galleryRow1`, `galleryRow2`, `galleryEmptyFullsuit` | Contained 3-item lists (`heads, partials, and paws`; `Filter..., pause..., or tap...`; `Heads, Partials, and Paws & Tails`). | Rewritten without rhetorical 3-item groupings while keeping exact photo details, filter labels, and Fullsuit CTA wording. | Clean, natural craft descriptions; preserved all `partValues` and `filterCategories`. |
| `offersDesc`, `offer1*`, `offer2*`, `packages[*].note`, `bonusText` | `"same fur batch"`, `"magnetic eyelids, built-in fan, or removable hair"`, `"head & neck liner, Velcro tongue, and Velcro eyelids"`. | `"exact same dye lot"`, `"magnetic eyelids or built-in fan, plus removable hair"`, `"head and neck lining with a Velcro tongue and Velcro eyelids"`. | Replaced tricolon cadence and added authentic fursuit maker specificity (`dye lot`), keeping every spec (`2 base colors`, `35 cm`, `70 cm`, `PETG`, `TPU`, `Mofu, Cream, Limey`). |
| `timelineDesc`, `faqDesc`, `contactIntro`, `dtdCalloutBody`, `confirm*` | `"You do NOT need one..."`; `"Quick answers... If yours isn't here, drop us a message..."` | `"But if your question isn't listed here, just message us and we'll answer straight."`; `"You do not need one just to ask for a quote, since we only collect it after your slot is confirmed."` | Removed shouty caps, added `"But"` opener, kept 24h reply and `FluffNii.furries@gmail.com`. |

### Vietnamese (`vi`)

| Section / Key | Before | After | Why & What Changed |
|---|---|---|---|
| `heroDesc` | Mình dựng rập và may sát theo ref sheet OC, đội lên vẫn thoáng khí và nhìn rõ. | Mình dựng rập sát theo ref sheet OC, chừa độ thoáng bên trong để bạn đội lên nhìn rõ và cử động thoải mái. | Smoother clause flow while staying compact for hero layout. |
| `phraseText` (+ highlights) | Xưởng mình làm những bộ fursuit nhẹ đầu, thoáng khí để bạn mặc đi fes cả ngày. Từng mảng màu được dựng rập tay từ ref, còn phần má với mõm thì tỉa mượt để giữ đúng nét nhân vật. | Xưởng mình làm fursuit sao cho nhẹ đầu và thoáng khí để bạn mặc đi fes cả ngày. Mình dựng rập tay từng mảng màu theo ref, rồi tỉa mượt má với mõm để giữ đúng thần thái nhân vật. | More natural Vietnamese rhythm; kept `phraseHighlights1` & `phraseHighlights2` token-matched. |
| `formulaLead` & `formulaBody*` | Đội lên vẫn giữ đúng nét mặt và dáng OC của bạn. Lông ngoài êm tay, bên trong chừa đủ độ thoáng. / Mình lên rập thẳng từ ref sheet... | Đội lên nhìn ra ngay OC của bạn, mà bên trong vẫn mát và dễ thở. / Mình vẽ rập ngay trên base theo ref sheet... Và phần tốn nhiều công nhất luôn là tỉa lông đều tay, **khâu chắc từng đường nối**, rồi chừa đủ khoảng thở để bạn đội suốt buổi fes không bị ngộp. | Natural spoken craftsperson phrasing (`nhìn ra ngay`, `khoảng thở`, `không bị ngộp`), added `"Và"` starter. |
| `pillars[0..2]` & `whoDesc` | Single-sentence mirror clauses (`Mình gọt...`, `Từng mảnh...`, `Bên trong...`; `không ép vào một khuôn sẵn`). | Two-sentence concrete explanations per card; direct phrasing (`Mình làm base mới theo từng bản vẽ thay vì dùng chung một khuôn có sẵn`). | Varied rhythm and clearer readability on cards. |
| `fanCards[0..4]` & `resultCards[0..3]` | `chiếc đuôi nảy nhịp theo bước đi`; uniform single-sentence `resultCards`. | Concise 1–2 sentence Vietnamese matching card heights (`<= 80` chars for `fanCards`, `<= 110` chars for `resultCards`). | Removed translated phrasing while keeping fursuit community terminology (`Kemono`, `urajiro`, `follow-me`, `Velcro`). |
| `methodSteps[0..2]`, `projects`, `galleryDesc` | Slight repetitive openers and `"khá chắc"` / `"khá mượt"` fillers. | Tighter, confident craftsperson descriptions (`gọn và chắc`, `êm mượt`); preserved real client reviews (`Sy tray`, `Felix`, `Umbréon Retsquôt`). | Authentic studio tone without robotic calques. |
| `faqDesc`, `dtdCalloutBody`, `confirm*` | `"Những câu tụi bạn hay hỏi nhất..."`, shouty `"CHƯA"`. | `"Tổng hợp những điều các bạn thường hỏi..."`, natural `"chưa cần làm trước"`. | Consistent warm `mình` / `bạn` register across the entire Vietnamese page. |

---

## 2. Accessories Page (`src/lib/accessoriesCopy.ts`) — Before vs. After

| Locale / Key | Before | After | Why & What Changed |
|---|---|---|---|
| EN `heroDesc` | 3D-printed cooling fans alongside oversized glasses and custom fan shells sized for fursuit heads... | 3D-printed cooling fans alongside oversized glasses and custom shells sized for fursuit heads. Pick what you need below, then either attach your list to a suit quote or DM @CrossTalk_f. | Kept direct two-branch action without inflating length. |
| EN `partnerNote` & `contactPartnerNote` | `Want to include these with a full suit build instead? Use Bundle with Fursuit Quote...` (rhetorical Q+A) | `If you would rather include these parts with a full suit build, use Bundle with Fursuit Quote or email us below.` | Removed rhetorical Q+A setup. |
| EN `workshopNotes[0..2]` | `USB-C power and soft TPU nozzles keep cooling comfortable, while wide glass bridges sit cleanly over thick faux fur.` | `USB-C power and soft TPU nozzles keep airflow easy to live with. Wide glass bridges also clear thick faux fur without pinching.` | Concrete maker phrasing (`without pinching`), two varied sentences. |
| EN `items[0..3].description` | Single run-on descriptions (`Compact 3D-printed... paired with..., ..., and ...`). | Split `internal-fan` and `fursuit-fan-std` into crisp two-sentence product notes; broke tricolon in `fursuit-accessories-tbd`. Preserved `250,000 VND`, `500,000 VND`, `15W Quick Charge`, `2 hrs`, `USB-C`, `TPU`. | Punchier card reading while preserving every spec and VND price. |
| VI `heroDesc`, `partnerNote`, `workshopNotes`, `contact*`, `items` | Slight translationese (`chỉ mua lẻ`, `thân quạt in 3D nguyên khối từ nhựa cứng`, `đẩy tốc độ gió`). | Natural Vietnamese workshop phrasing (`thân quạt nhựa cứng in 3D`, `đẩy lực gió tối đa`, consistent `mình` / `bạn` / `@CrossTalk_f`). | Consistent warm Vietnamese tone and preserved all VND numbers (`250.000 VNĐ`, `500.000 VNĐ`). |

---

## 3. Timeline, FAQ, Terms & Legal (`src/lib/studioExtraCopy.ts`) — Before vs. After

### Timeline (`TIMELINE_STEPS` / `Deroule.tsx`)

| Step | Before (EN / VI summary) | After (EN / VI summary) | Why & What Changed |
|---|---|---|---|
| 01 | EN: `We lock in your fur tier, color count, and total quote...` / VI: `chốt xong hết bạn mới chuyển 40%...` | EN: `Within 24 hours, we confirm your fur tier and color count to lock in the total price...` / VI: `Trong vòng 24 giờ mình sẽ báo tổng giá kèm dòng lông và số màu, thống nhất hết rồi bạn mới chuyển 40%...` | Broke tricolon (`tier, color count, and total quote`) and smoothed VI clause order. |
| 02 | EN: `Once the quote is set...` / VI: `tụi mình cùng kiểm lại...` | EN: `After the deposit clears, we match exact fur dye-lot swatches and check where hardware sits. Then we order materials right before your build enters the bench queue.` | Clearer chronology (`after the deposit clears`, `bench queue`). |
| 03 | EN: `Because one maker handles every suit, I message you...` | EN: `One maker builds every suit from start to finish, so I message you as soon as your turn begins. You get progress photos along the way so we catch small questions early.` | Two varied sentences; less formulaic causal opener. |
| 04 | EN: `head silhouette, ear angle, and pattern fit` | EN: `confirm head silhouette and ear tilt, plus how the pattern balances before fur gets stitched down permanently.` | Eliminated 3-item tricolon. |
| 05 | EN: `Once shaving, eyes, inner lining, and small details are done...` | EN: `Once the face shave is even, the eyes and inner lining are in, and trim details are set, I send full photos of the finished suit for your final check.` | Concrete craft wording (`face shave is even`, `trim details are set`). |
| 06 | EN: `You have 3 months after completion to pay the remaining 60% balance.` | EN: `You have 3 months from completion to settle the remaining 60% balance. As soon as the full total clears, I box your suit up and ship it out.` | Kept 3-month / 60% rule verbatim in meaning, crisper finish. |

### FAQ (`FAQ_ITEMS` / `FAQAccordion.tsx`)

| Q# | Before | After | Why & What Changed |
|---|---|---|---|
| Q1 | EN: `start with a Mini partial... Go for a Fullsuit if...` / VI: `chỉ có 2 câu dài` | EN: Split plantigrade/digitigrade explanation cleanly; VI: `Xưởng làm cả hai kiểu chân: plantigrade dáng đứng thẳng nhẹ người, hoặc digitigrade có đệm tạo đường cong chân thú.` | Clearer separation between package recommendation and leg-style choice. |
| Q2 | EN: `Where are you based, how long does a build take, and do you take rush orders?` + `I do not take rush orders because...` | EN: `How long does a build take from Vietnam, and do you take rush orders?` + `But I do not take rush orders because one person handles every step here...` | Broke 3-part question tricolon while keeping Vietnam location, turnaround, rush-order rule, and 24h reply; starts sentence with `"But"`. |
| Q3 | EN: `Minor tweaks are always welcome early on, while big changes outside your original ref sheet are not.` | EN: `Handmade sewing always carries slight natural variation. Small tweaks are easy to handle early on, though major changes outside your original ref sheet are not included.` | Removed symmetrical `"while"` negation contrast; states handmade reality plainly. |
| Q4 | EN/VI 40% non-refundable deposit & 3-month 60% balance window. | Reworked into smoother short-to-medium sentences keeping 40%, 60%, 3-month forfeiture, and 100% ship trigger exact. | Clearer pacing without altering any policy condition. |
| Q5 | Glasses clearance behind eye blanks. | Tightened phrasing (`include your frame width alongside your head measurements` / `đo kèm giúp mình bề ngang gọng kính là ổn`). | Short, practical, zero fluff. |
| Q6 | EN: 4-clause run-on care instructions (`mist..., wipe..., let..., and hand-wash...`). | Split into repair support sentence + cleaning sentence + paw/tail hand-wash sentence. | Much easier to scan for suit owners. |

### Terms & Policy (`TERMS_COPY` / `TermsContent.tsx`)

- **General Information (`sec1Title`)**: Replaced `"instead of expecting factory machine uniformity"` and `"rather than casual small talk"` parallel negations with direct statements (`"Handmade work will never look machine-stamped like a factory product."` / `"Please keep our DMs centered on your build so my schedule stays focused on sewing time."`), and polished VI politeness without stiff phrasing.
- **Process (`sec2Title`)**: Kept all 11 sequential steps intact; removed tricolon in Step 2 (`"Confirm your fur tier and color count by email to lock the total quote before paying."`).
- **Rush Orders (`sec3Title`)**: Tightened `"weather, humidity, and fur delivery times"` -> `"local humidity and fur delivery timing"` (EN) and `"độ ẩm thời tiết và lịch hàng lông về"` (VI); preserved `"No rush orders."` / `"Xưởng không nhận đơn làm gấp."` and solo workshop note.
- **Deposit & Payment (`sec4Title`)**: Preserved 40% upfront non-refundable deposit, queue & fur sourcing allocation, premade resale right upon abandonment, 3-month 60% balance window, forfeiture after 3 months, and immediate shipment at 100%; removed exclamation mark in VI `deadlineText`.
- **Warranty & Repairs (`sec5Title`)**: Broke both 3-item tricolons (`loose seams, glue separation, or hardware faults` and `regular wear..., improper washing..., and accidental drops...`) into natural two-part sentences while retaining 100% of covered defects and exclusions.

### Legal & Privacy (`LEGAL_COPY` / `LegalContent.tsx`)

- **Studio Info (`(001)`) & Hosting (`(002)`)**: Preserved Vietnam base, solo online workshop, `FluffNii.furries@gmail.com`, IG/X/TikTok handles, Felix Algorithm credit, and Cloudflare Workers hosting.
- **IP (`(003)`)**: Replaced 4-item list (`Photos, text, graphics, and motion work`) with `"Site photography and written copy, along with custom graphics and motion work"` and natural VI equivalent; preserved OC ownership guarantee.
- **Privacy (`(004)`)**: Replaced `"review, update, or delete"` tricolon with `"If you want to review what you sent or have us update or delete it, email FluffNii.furries@gmail.com anytime."`; kept every collected form field exact.
- **Cookies (`(005)`) & Links (`(006)`)**: Broke 3-item lists in EN while preserving all 3 storage behaviors (EN/VI choice, quote draft, same-session intro skip) and `@CrossTalk_f` link disclaimer.

---

## 4. Non-Negotiable Data & Type Integrity Audit

Verified by reading source files, checking consumers across `src/`, and running `npx tsc --noEmit` + Node verification script:

| Check | Status | Details |
|---|---|---|
| TypeScript compilation (`npx tsc --noEmit`) | PASS (exit code 0) | Checked after edits to `homeCopy.ts`, `accessoriesCopy.ts`, and creation of `studioExtraCopy.ts`. |
| Exported TypeScript signatures | PRESERVED | All interfaces/types/functions (`HomeLocaleCopy`, `localizeCommissionNote`, `HOME_COPY`, `AccessoriesLocaleCopy`, `formatVnd`, `ACCESSORIES_COPY`) kept identical. |
| Homepage fursuit pricing | NONE ADDED | All fursuit packages remain quote-by-ref-sheet only. |
| Accessories VND prices | PRESERVED | `250000` (`From 250,000 VND` / `Từ 250.000 VNĐ`) and `500000` (`From 500,000 VND` / `Từ 500.000 VNĐ`) untouched. |
| DTD & commission form values | PRESERVED | `"Only body"`, `"Half-body"`, `"Fullsuit"` (matching `BODY_DTD_OPTIONS` in `page.tsx` and `api/contact/route.ts`) and `localizeCommissionNote` server-string checks untouched. |
| Contact & partner details | PRESERVED | `FluffNii.furries@gmail.com`, `@CrossTalk_f`, IG `@fluffnii.fur`, X `@Fluffnii_FUR`, TikTok `@fluffnii_fur`, 24h reply time, 40% non-refundable deposit, 60% / 3-month balance window all verified intact. |
| `PhraseScroll` highlight matching | VERIFIED | Token-level matcher confirmed 100% match for both EN & VI `phraseHighlights1` and `phraseHighlights2`. |

---

## 5. Humanize-Writing Quality Checklist Verification

- [x] **Zero Tier 1 banned words** — Verified `0` hits via automated regex scan across `homeCopy.ts`, `accessoriesCopy.ts`, and `studioExtraCopy.ts`.
- [x] **Minimal Tier 2 words** — Verified `0` hits across all three copy files.
- [x] **`<= 2` formal Tier 3 transitions per section** — Verified `0` Tier 3 formal transition hits across all three copy files.
- [x] **Zero parallel negations (`"Not X, but Y"`)** — Removed `"rather than"`, `"instead of"`, and symmetric `"while"` negations across copy files.
- [x] **Zero rhetorical tricolons** — Replaced 3-item rhetorical noun/verb lists with 2-item pairs or split clauses (leaving only true factual product inventories such as `"Head, Paws, Feet, Tail"` or `"Mofu, Cream, Limey"`).
- [x] **Max 1 em dash per 500 words** — Verified `0` em dashes (`—`) across all three copy files.
- [x] **Zero rhetorical Q + answer setups** — Removed `"Want to include these...? Use..."` in `accessoriesCopy.ts`; kept FAQ questions strictly as user-facing accordion headings.
- [x] **Zero mirror structures** — Varied sentence openings and clause structures across `pillars`, `fanCards`, `resultCards`, `methodSteps`, `projects`, and `workshopNotes`.
- [x] **No dramatic reveals or inflation of importance** — Zero `"Here's the thing:"`, `"pivotal"`, `"crucial"`, or `"testament"`.
- [x] **Paragraphs stopping cleanly without tidy bows** — Card descriptions and prose blocks end on concrete bench details or practical specs (`"without pinching"`, `"so they keep their bounce"`, `"Nothing drifts out of place."`).
- [x] **Varied sentence length & `"And"` / `"But"` starters** — Includes conversational `"And"` / `"But"` openers (`formulaBodyBefore`, `methodDesc`, FAQ Q2, VI `formulaBodyBefore` `"Và"`, VI FAQ Q2 `"Nhưng"`).
- [x] **Natural Vietnamese studio voice** — Consistent `"mình"` / `"xưởng mình"` + `"bạn"` tone with authentic Vietnamese fursuit terminology (`ref sheet`, `WIP`, `Kemono`, `urajiro`, `follow-me`, `đi fes`).
- [x] **UI frame & line-length budget respected** — Preserved compact lengths for `whitespace-nowrap` hero title and checkboxes, fixed-height `fanCards` (`<= 80` chars) and `resultCards` (`<= 116` chars), and Polaroid package rows.
