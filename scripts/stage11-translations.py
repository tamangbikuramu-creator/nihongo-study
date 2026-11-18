import json,csv,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
p=root/'src/vocab-example-translations.generated.json'
data=json.loads(p.read_text(encoding='utf-8'))
# Each row: Japanese, Nepali, Vietnamese, Burmese, Chinese, Brazilian Portuguese.
rows=[
('彼はあした来るかな。','ऊ भोलि आउला कि?','Không biết ngày mai anh ấy có đến không.','သူ မနက်ဖြန် လာမလား မသိဘူး။','不知道他明天会不会来。','Será que ele vem amanhã?'),
('棚にアルバムがある。','दराजमा एउटा फोटो एल्बम छ।','Có một cuốn album trên kệ.','စင်ပေါ်မှာ ဓာတ်ပုံအယ်လ်ဘမ်တစ်အုပ် ရှိတယ်။','架子上有一本相册。','Há um álbum na prateleira.'),
('彼は私にアルバムを見せた。','उसले मलाई फोटो एल्बम देखायो।','Anh ấy cho tôi xem album ảnh.','သူက ကျွန်တော့်ကို ဓာတ်ပုံအယ်လ်ဘမ် ပြခဲ့တယ်။','他给我看了相册。','Ele me mostrou o álbum de fotos.'),
('あんまり無理するなよ。','धेरै जबरजस्ती नगर है।','Đừng cố quá sức nhé.','အရမ်း အားမစိုက်နဲ့နော်။','别太勉强自己。','Não se esforce demais.'),
('彼はいたずら好きだ。','उसलाई बदमासी गर्न मन पर्छ।','Anh ấy thích nghịch ngợm.','သူက နောက်ပြောင်ရတာ ကြိုက်တယ်။','他喜欢恶作剧。','Ele gosta de fazer travessuras.'),
('彼はいたずらっ子だ。','ऊ चकचके केटा हो।','Cậu ấy là một cậu bé nghịch ngợm.','သူက ဆော့တတ်တဲ့ ကောင်လေးပါ။','他是个淘气的男孩。','Ele é um menino travesso.'),
('これをいただきます。','म यो लिन्छु।','Tôi sẽ lấy cái này.','ဒါကို ယူပါမယ်။','我要这个。','Vou ficar com este.'),
('いつか電話してよ。','कुनै दिन फोन गर है।','Hôm nào gọi cho tôi nhé.','တစ်နေ့နေ့ ဖုန်းဆက်ပါဦး။','哪天给我打个电话吧。','Me ligue qualquer dia.'),
('いつでも来て。','जहिले आए पनि हुन्छ।','Hãy đến bất cứ lúc nào.','ဘယ်အချိန်မဆို လာပါ။','随时来吧。','Venha quando quiser.'),
('いつでも合図して。','जहिले पनि सङ्केत गर।','Cứ ra hiệu bất cứ lúc nào.','ဘယ်အချိန်မဆို အချက်ပြပါ။','随时给我信号。','Dê um sinal a qualquer momento.'),
('いつまでもお幸せに！','सधैँ खुसी रहनुहोस्!','Chúc hai bạn mãi hạnh phúc!','အမြဲတမ်း ပျော်ရွှင်ကြပါစေ။','祝你们永远幸福！','Sejam felizes para sempre!'),
('あちこち痒いよ。','जताततै चिलाइरहेको छ।','Tôi bị ngứa khắp nơi.','နေရာအနှံ့ ယားနေတယ်။','我浑身都痒。','Estou com coceira por todo o corpo.'),
('彼はあちこち歩いた。','ऊ यताउता हिँड्यो।','Anh ấy đi bộ khắp nơi.','သူ ဟိုဟိုဒီဒီ လျှောက်သွားခဲ့တယ်။','他到处走了走。','Ele andou de um lado para o outro.'),
('あいにく話中です。','माफ गर्नुहोस्, लाइन व्यस्त छ।','Rất tiếc, đường dây đang bận.','စိတ်မကောင်းပါဘူး၊ ဖုန်းလိုင်း မအားသေးပါ။','抱歉，电话占线。','Infelizmente, a linha está ocupada.'),
('アイロンがけ、大っ嫌い。','मलाई इस्त्री गर्न पटक्कै मन पर्दैन।','Tôi rất ghét là quần áo.','မီးပူတိုက်ရတာ အရမ်းမုန်းတယ်။','我最讨厌熨衣服了。','Odeio passar roupa.'),
('このアイロンを直して下さい。','कृपया यो इस्त्री मर्मत गरिदिनुहोस्।','Xin hãy sửa chiếc bàn ủi này.','ဒီမီးပူကို ပြင်ပေးပါ။','请修一下这个熨斗。','Por favor, conserte este ferro de passar.'),
('夏はアイスクリームに限る。','गर्मीमा आइसक्रिम नै सबैभन्दा राम्रो।','Mùa hè thì không gì bằng kem.','နွေရာသီမှာ ရေခဲမုန့်က အကောင်းဆုံးပဲ။','夏天还是冰淇淋最好。','No verão, nada melhor que sorvete.'),
('連絡を怠るな。','सम्पर्क गर्न नबिर्स।','Đừng lơ là việc liên lạc.','ဆက်သွယ်ဖို့ မပျက်ကွက်နဲ့။','不要疏于联系。','Não deixe de manter contato.'),
('あらゆる機会を利用せよ。','हरेक अवसरको सदुपयोग गर।','Hãy tận dụng mọi cơ hội.','အခွင့်အရေးတိုင်းကို အသုံးချပါ။','要利用一切机会。','Aproveite todas as oportunidades.'),
('あんまり金を欲しがるな。','पैसाको धेरै लोभ नगर।','Đừng quá tham tiền.','ငွေကို အရမ်းမမက်မောနဲ့။','别太贪钱。','Não seja tão ganancioso por dinheiro.'),
]
langs=['ne','vi','my','zh','ptBR']; added=0; found=0
for jp,*vals in rows:
 if jp not in data: continue
 found+=1
 for lang,val in zip(langs,vals):
  if not data[jp].get(lang):data[jp][lang]=val;added+=1
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'MISSING_TRANSLATIONS.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f);w.writerow(['Japanese','English','Missing languages'])
 for jp,obj in data.items():
  missing=[l for l in langs if not obj.get(l)]
  if missing:w.writerow([jp,obj.get('en',''),','.join(missing)])
print('sentences matched:',found,'new translations:',added,'remaining sentences:',sum(any(not obj.get(l) for l in langs) for obj in data.values()))
