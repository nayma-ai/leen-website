// Privacy policy and terms, in both languages.
// Source: current app/relay data flows and docs/RELEASE_PLAN.md (2026-10-04): Apple on-device recognition by default,
// cloud processing only after explicit permission. Review before launch.
import { site } from './content.mjs';

const company = `<a href="${site.companyUrl}" rel="noopener">${site.company}</a>`;
const mail = `<a href="mailto:${site.contactEmail}">${site.contactEmail}</a>`;

export const legal = {
  en: {
    privacy: {
      title: 'Privacy Policy',
      description: 'How Leen handles your food journal: on your iPhone, no account, and cloud processing only with your permission.',
      html: `
<p class="prose__lead">Leen is a product by ${company}. It is a food journal that runs on your iPhone. It was built privacy-first: there is no account, no login, and no Leen server that stores your journal. This policy explains, plainly, what that means.</p>

<h2>The short version</h2>
<ul>
  <li>Your food journal lives <strong>on your iPhone</strong>. We don’t have a copy.</li>
  <li>There is <strong>no sign-up and no account</strong>. We never ask for your name, email or phone number. A name you choose to tell Leen is stored on your device.</li>
  <li>On supported iPhones, Leen understands your meals <strong>on the device</strong>, using Apple’s on-device model.</li>
  <li>Cloud processing is <strong>optional and off</strong> until you give permission. You can turn it off at any time.</li>
  <li>We <strong>don’t track you, show ads or sell data</strong>. The app contains no third-party advertising or analytics SDKs.</li>
</ul>

<h2>What Leen stores, and where</h2>
<p><strong>On your device only:</strong> the meals you log, photos you attach, weights, goals, your conversations with Leen and your preferences. This data is kept in the app’s private storage and is removed if you delete the app (unless you enabled iCloud backup — see below).</p>
<p>Leen does not operate a database of user journals. If you choose Online help, the relevant context for your request passes through our service as described below.</p>

<h2>How Leen understands your meals</h2>
<p><strong>On device (the default).</strong> On iPhones and languages supported by Apple’s on-device model, Leen uses that model to understand what you wrote. On other devices, Leen’s built-in food matching does the work. Either way, this happens entirely on your iPhone. Nutrition values come from Leen’s built-in food catalogue.</p>
<p><strong>Online help (optional).</strong> If you choose Online help in Settings, Leen asks for permission first. With permission, meal text, attached photos, profile details and relevant journal context pass through Leen’s service to <strong>Anthropic, Google, or OpenAI</strong>, depending on the configured provider. The service forwards your request and returns the response; it does not keep a journal database. Requests use your anonymous RevenueCat app-user identifier to check subscription access. Switching back to <em>On your iPhone</em> withdraws this permission. Providers process requests under their own policies: <a href="https://www.anthropic.com/legal/privacy" rel="noopener">Anthropic</a>, <a href="https://policies.google.com/privacy" rel="noopener">Google</a>, and <a href="https://openai.com/policies/privacy-policy/" rel="noopener">OpenAI</a>.</p>
<p>When you request a generated dish image, the description needed to create that image is sent through Leen’s service to Google. This requires internet access. Journal answers about recorded meals are calculated on your iPhone.</p>

<h2>Apple Health (optional)</h2>
<p>If you enable Apple Health, Leen writes the meals you log (calories, protein, carbohydrates, fat) to Apple Health and reads your active energy to inform your day. This exchange happens on your device, between Leen and Apple Health, under Apple’s privacy protections. Leen does not send Health data anywhere else. You can turn this off in Leen’s Settings and revoke access in the Health app.</p>

<h2>iCloud backup (optional)</h2>
<p>If you enable iCloud backup, Leen copies your journal and meal photos to <strong>your own iCloud</strong> so you can restore them on a new device. This uses your personal iCloud account and is governed by <a href="https://www.apple.com/legal/privacy/" rel="noopener">Apple’s Privacy Policy</a>. We have no access to your iCloud contents.</p>


<h2>Purchases</h2>
<p>Subscriptions are handled by <strong>Apple</strong> and <strong>RevenueCat</strong>, our subscription manager. Apple processes payment; we never see your card details. RevenueCat records your subscription status against an anonymous identifier — see <a href="https://www.revenuecat.com/privacy" rel="noopener">RevenueCat’s Privacy Policy</a>.</p>


<h2>This website</h2>
<p>leen.fit uses no cookies, no analytics and no third-party scripts or fonts. Our hosting provider may process standard technical data, such as IP addresses, to deliver the site securely. This site does not store a theme preference or journal data in your browser.</p>

<h2>Children</h2>
<p>Leen is not directed at children under 13 and does not knowingly collect data from them.</p>

<h2>Your control</h2>
<ul>
  <li>Delete any meal or conversation in the app.</li>
  <li>“Start fresh” in Settings removes all meals and conversations.</li>
  <li>Turn off Online help, Apple Health or iCloud backup at any time.</li>
  <li>Deleting the app removes all on-device data.</li>
</ul>

<h2>Changes</h2>
<p>If this policy changes, we’ll update the date above and, for material changes, note it in the app or on this page.</p>

<h2>Contact</h2>
<p>Questions about privacy: ${mail}</p>
`,
    },
    terms: {
      title: 'Terms of Use',
      description: 'The terms for using Leen, the food journal for iPhone.',
      html: `
<p class="prose__lead">Leen is a product by ${company}. Thanks for using Leen. These terms are short on purpose.</p>

<h2>The app licence</h2>
<p>Leen is licensed to you under Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noopener">Standard Licensed Application End User License Agreement</a>, together with these terms. If they ever conflict, Apple’s agreement applies.</p>

<h2>A journal, not medical advice</h2>
<p>Leen helps you keep a record of what you eat. It is not a medical device and does not provide medical, dietary or nutritional advice. Nutrition figures are estimates — Leen marks them as such — and may not be exact. For medical nutrition questions, talk to a qualified professional.</p>

<h2>Leen Pro</h2>
<p>Leen Pro is an optional auto-renewing subscription. What it includes, and its price, are shown in the app before you subscribe. Payment is charged to your Apple ID at confirmation of purchase. The subscription renews automatically unless cancelled at least 24 hours before the end of the current period. You can manage or cancel it at any time in your Apple ID settings. The free journal keeps working if you don’t subscribe or your subscription ends.</p>

<h2>Optional cloud processing</h2>
<p>If you turn on Online help, your requests are processed by a third-party AI provider as described in our <a href="/privacy/">Privacy Policy</a>. Please don’t send content you don’t have the right to share.</p>

<h2>Your content</h2>
<p>Your journal is yours. It stays on your device (and your own iCloud, if you enable backup). We don’t claim any rights to it.</p>

<h2>Changes</h2>
<p>We may update these terms as Leen evolves. We’ll change the date above, and for material changes, let you know in the app or on this page.</p>

<h2>Contact</h2>
<p>${mail}</p>
`,
    },
  },

  ar: {
    privacy: {
      title: 'سياسة الخصوصية',
      description: 'كيف يتعامل لين مع دفتر أكلك: على جوالك، بدون حساب، والمعالجة السحابية بإذنك فقط.',
      html: `
<p class="prose__lead">لين منتج من ${company}، ودفتر يوميات طعام يشتغل على الآيفون. بنيناه والخصوصية أولًا: ما فيه حساب، ولا تسجيل دخول، ولا خادم للين يخزّن دفترك. هذي السياسة توضّح ببساطة وش يعني هذا.</p>

<h2>باختصار</h2>
<ul>
  <li>دفتر أكلك يعيش <strong>على جوالك</strong>. وما عندنا نسخة منه.</li>
  <li><strong>بدون تسجيل وبدون حساب</strong>. ما نطلب اسمك ولا إيميلك ولا رقمك. وإذا قلت للين اسمك، ينحفظ على جهازك.</li>
  <li>على الآيفونات المدعومة، يفهم لين وجباتك <strong>على الجهاز نفسه</strong> باستخدام نموذج آبل على الجهاز.</li>
  <li>المعالجة السحابية <strong>اختيارية ومقفلة</strong> لين ما تعطي إذنك، وتقدر توقفها متى ما بغيت.</li>
  <li><strong>ما نتتبعك، ولا نعرض إعلانات، ولا نبيع بيانات</strong>. التطبيق ما فيه أي أدوات إعلانات أو تحليلات من أطراف ثالثة.</li>
</ul>

<h2>وش يحفظ لين، ووين</h2>
<p><strong>على جهازك فقط:</strong> الوجبات اللي تسجّلها، والصور اللي ترفقها، والأوزان، والأهداف، ومحادثاتك مع لين، وتفضيلاتك. هذي البيانات محفوظة في مساحة التطبيق الخاصة، وتنحذف إذا حذفت التطبيق (إلا إذا فعّلت النسخ الاحتياطي على iCloud — شوف تحت).</p>
<p>ما عند لين قاعدة بيانات لدفاتر المستخدمين. إذا اخترت المساعدة عبر الإنترنت، يمرّ السياق المرتبط بطلبك عبر خدمتنا كما هو موضّح أدناه.</p>

<h2>كيف يفهم لين وجباتك</h2>
<p><strong>على الجهاز (الوضع الافتراضي).</strong> على الآيفونات واللغات اللي يدعمها نموذج آبل على الجهاز، يستخدمه لين لفهم اللي كتبته. وعلى الأجهزة الثانية، تتكفّل المطابقة المدمجة في لين بالمهمة. وفي الحالتين، كل شي يصير على جوالك. والقيم الغذائية مأخوذة من قائمة الأطعمة المدمجة في لين.</p>
<p><strong>المساعدة عبر الإنترنت (اختيارية).</strong> إذا اخترتها من الإعدادات، يستأذنك لين أولًا. وبإذنك، يمرّ نص الوجبة والصور المرفقة وتفاصيل ملفك والسياق المرتبط بسجلك عبر خدمة لين إلى <strong>Anthropic أو Google أو OpenAI</strong> حسب المزوّد المُعدّ. تمرّر الخدمة الطلب وتعيد الرد، وما عندها قاعدة بيانات لدفاتر المستخدمين. تستخدم الطلبات معرّف مستخدم RevenueCat المجهول للتحقق من الاشتراك. الرجوع إلى «على جهازك» يلغي هذا الإذن. ويعالج المزوّدون الطلبات وفق سياساتهم: <a href="https://www.anthropic.com/legal/privacy" rel="noopener">Anthropic</a> و<a href="https://policies.google.com/privacy" rel="noopener">Google</a> و<a href="https://openai.com/policies/privacy-policy/" rel="noopener">OpenAI</a>.</p>
<p>عندما تطلب صورة مولّدة لطبق، يُرسل الوصف اللازم لإنشاء الصورة عبر خدمة لين إلى Google. هذا يحتاج اتصالًا بالإنترنت. أما إجابات الدفتر عن وجباتك المسجّلة فتُحسب على جهازك.</p>

<h2>صحة آبل (اختياري)</h2>
<p>إذا فعّلت صحة آبل، يكتب لين الوجبات اللي تسجّلها (السعرات، البروتين، الكربوهيدرات، الدهون) في تطبيق صحة آبل، ويقرأ الطاقة النشطة عشان يدخلها في حسبة يومك. هذا التبادل يصير على جهازك، بين لين وصحة آبل، تحت حماية الخصوصية من آبل. ولين ما يرسل بيانات الصحة لأي مكان ثاني. تقدر توقفها من إعدادات لين، وتلغي الوصول من تطبيق الصحة.</p>

<h2>النسخ الاحتياطي على iCloud (اختياري)</h2>
<p>إذا فعّلت النسخ الاحتياطي، ينسخ لين دفترك وصور وجباتك إلى <strong>iCloud الخاص فيك</strong> عشان تسترجعها على جهاز جديد. هذا يستخدم حسابك الشخصي على iCloud ويخضع لـ<a href="https://www.apple.com/legal/privacy/" rel="noopener">سياسة خصوصية آبل</a>. وما عندنا أي وصول لمحتويات iCloud حقك.</p>


<h2>المشتريات</h2>
<p>الاشتراكات تتم عبر <strong>آبل</strong> و<strong>RevenueCat</strong>، مدير الاشتراكات اللي نستخدمه. آبل تعالج الدفع، وإحنا ما نشوف بيانات بطاقتك أبدًا. وتسجّل RevenueCat حالة اشتراكك مقابل معرّف مجهول — شوف <a href="https://www.revenuecat.com/privacy" rel="noopener">سياسة خصوصية RevenueCat</a>.</p>


<h2>هذا الموقع</h2>
<p>موقع leen.fit ما يستخدم ملفات تعريف الارتباط، ولا أدوات تحليل، ولا سكربتات أو خطوط من أطراف ثالثة. وقد يعالج مزوّد الاستضافة بيانات تقنية معتادة، مثل عنوان IP، لتقديم الموقع بشكل آمن. وما يحفظ الموقع تفضيل ثيم أو بيانات دفتر في متصفحك.</p>

<h2>الأطفال</h2>
<p>لين غير موجّه للأطفال دون ١٣ سنة، وما يجمع بياناتهم عن علم.</p>

<h2>التحكم بيدك</h2>
<ul>
  <li>احذف أي وجبة أو محادثة من التطبيق.</li>
  <li>«ابدأ من جديد» في الإعدادات يحذف كل الوجبات والمحادثات.</li>
  <li>أوقف المساعدة عبر الإنترنت أو صحة آبل أو النسخ الاحتياطي على iCloud متى ما بغيت.</li>
  <li>حذف التطبيق يحذف كل البيانات اللي على الجهاز.</li>
</ul>

<h2>التغييرات</h2>
<p>إذا تغيّرت هذي السياسة، بنحدّث التاريخ فوق، وللتغييرات الجوهرية بننبّه عليها في التطبيق أو في هذي الصفحة.</p>

<h2>تواصل معنا</h2>
<p>لأسئلة الخصوصية: ${mail}</p>
<p class="prose__note">في حال وجود أي اختلاف بين النسخة العربية والإنجليزية، تُعتمد <a href="/privacy/" lang="en">النسخة الإنجليزية</a>.</p>
`,
    },
    terms: {
      title: 'شروط الاستخدام',
      description: 'شروط استخدام لين، دفتر يوميات الطعام للآيفون.',
      html: `
<p class="prose__lead">لين منتج من ${company}. شكرًا لاستخدامك لين. خلّينا هذي الشروط مختصرة عن قصد.</p>

<h2>ترخيص التطبيق</h2>
<p>يُرخَّص لك لين بموجب <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noopener">اتفاقية ترخيص المستخدم النهائي القياسية من آبل</a>، مع هذي الشروط. وإذا تعارضتا، تُطبَّق اتفاقية آبل.</p>

<h2>دفتر يوميات، مو استشارة طبية</h2>
<p>لين يساعدك تسجّل وش تاكل. هو مو جهاز طبي، وما يقدّم استشارات طبية أو غذائية. القيم الغذائية تقديرية — ولين يوضّح ذلك — وقد لا تكون دقيقة تمامًا. لأسئلة التغذية الطبية، استشر مختصًا مؤهلًا.</p>

<h2>لين برو</h2>
<p>«لين برو» اشتراك اختياري يتجدد تلقائيًا. محتواه وسعره يظهرون لك داخل التطبيق قبل ما تشترك. يُحصَّل المبلغ من حساب Apple ID عند تأكيد الشراء، ويتجدد الاشتراك تلقائيًا ما لم يُلغَ قبل نهاية الفترة الحالية بـ٢٤ ساعة على الأقل. وتقدر تديره أو تلغيه في أي وقت من إعدادات Apple ID. والدفتر المجاني يظل شغّال إذا ما اشتركت أو انتهى اشتراكك.</p>

<h2>المعالجة السحابية الاختيارية</h2>
<p>إذا فعّلت المساعدة عبر الإنترنت، تُعالج طلباتك عند مزوّد ذكاء اصطناعي خارجي كما هو موضّح في <a href="/ar/privacy/">سياسة الخصوصية</a>. لا ترسل محتوى ما يحق لك مشاركته.</p>

<h2>محتواك</h2>
<p>دفترك ملكك. يظل على جهازك (وعلى iCloud الخاص فيك إذا فعّلت النسخ الاحتياطي)، وما ندّعي أي حق فيه.</p>

<h2>التغييرات</h2>
<p>قد نحدّث هذي الشروط مع تطوّر لين. بنغيّر التاريخ فوق، وللتغييرات الجوهرية بنبلغك في التطبيق أو في هذي الصفحة.</p>

<h2>تواصل معنا</h2>
<p>${mail}</p>
<p class="prose__note">في حال وجود أي اختلاف بين النسخة العربية والإنجليزية، تُعتمد <a href="/terms/" lang="en">النسخة الإنجليزية</a>.</p>
`,
    },
  },
};
