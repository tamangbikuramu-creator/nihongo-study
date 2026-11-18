import json,csv,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
p=root/'src/vocab-example-translations.generated.json'
data=json.loads(p.read_text())
entries={
'またあしたね。':['भोलि फेरि भेटौँला।','Hẹn gặp lại ngày mai nhé.','မနက်ဖြန် ပြန်တွေ့မယ်နော်။','明天见！','Até amanhã!'],
'ありがとう！':['धन्यवाद!','Cảm ơn!','ကျေးဇူးတင်ပါတယ်။','谢谢！','Obrigado!'],
'何かあった？':['केही भयो?','Có chuyện gì vậy?','ဘာဖြစ်လို့လဲ။','发生什么事了吗？','Aconteceu alguma coisa?'],
'あと一息だ。':['अब अलिकति मात्र बाँकी छ।','Chỉ còn một chút nữa thôi.','နည်းနည်းပဲ လိုတော့တယ်။','再加把劲就好了。','Falta só mais um pouquinho.'],
'テイクアウトしよう。':['खाना प्याक गरेर लैजाऔँ।','Mua mang về nhé.','ပါဆယ်ဝယ်ကြရအောင်။','我们打包带走吧。','Vamos pedir para viagem.'],
'いい人です。':['उहाँ राम्रो मान्छे हुनुहुन्छ।','Anh ấy là người tốt.','သူက လူကောင်းတစ်ယောက်ပါ။','他是个好人。','Ele é uma boa pessoa.'],
'いえ、結構です。':['होइन, पर्दैन। धन्यवाद।','Không, cảm ơn.','မလိုပါဘူး၊ ကျေးဇူးတင်ပါတယ်။','不用了，谢谢。','Não, obrigado.'],
'なぜいけないの？':['किन हुँदैन?','Tại sao không được?','ဘာလို့ မရတာလဲ။','为什么不行？','Por que não pode?'],
'泣いちゃいそう！':['म रुनै लागेँ!','Tôi sắp khóc rồi!','ငိုတော့မယ်။','我快哭了！','Estou quase chorando!'],
'旅行はいつから？':['यात्रा कहिलेदेखि सुरु हुन्छ?','Chuyến đi bắt đầu khi nào?','ခရီးက ဘယ်တော့စမှာလဲ။','旅行什么时候开始？','Quando começa a viagem?'],
'力が尽きた。':['मेरो शक्ति सकियो।','Tôi đã kiệt sức.','အားကုန်သွားပြီ။','我已经筋疲力尽了。','Minhas forças se esgotaram.'],
'全力でやれ。':['पूरा शक्ति लगाएर गर।','Hãy cố hết sức.','အစွမ်းကုန် ကြိုးစားပါ။','全力以赴吧。','Faça o seu melhor.'],
'私は歴史に弱い。':['म इतिहासमा कमजोर छु।','Tôi không giỏi lịch sử.','ကျွန်တော် သမိုင်းမှာ အားနည်းတယ်။','我不擅长历史。','Não sou bom em história.'],
'運がいいね。':['तिम्रो भाग्य राम्रो रहेछ।','Bạn may mắn thật đấy.','ကံကောင်းလိုက်တာ။','你运气真好。','Que sorte a sua!'],
'本ありがとう。':['किताबका लागि धन्यवाद।','Cảm ơn vì cuốn sách.','စာအုပ်အတွက် ကျေးဇူးတင်ပါတယ်။','谢谢你的书。','Obrigado pelo livro.'],
}
langs=['ne','vi','my','zh','ptBR']
added=0
for jp,vals in entries.items():
 if jp not in data: continue
 for lang,val in zip(langs,vals):
  if not data[jp].get(lang):data[jp][lang]=val;added+=1
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
with (root/'MISSING_TRANSLATIONS.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f);w.writerow(['Japanese','English','Missing languages'])
 for jp,obj in data.items():
  missing=[l for l in langs if not obj.get(l)]
  if missing:w.writerow([jp,obj.get('en',''),','.join(missing)])
print('added',added,'remaining entries',sum(any(not d.get(l) for l in langs) for d in data.values()))
