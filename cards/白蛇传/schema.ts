export const Schema = z.object({
  当前时间: z.string().prefault('午后'),
  当前年月: z.string().prefault('南宋绍兴十七年二月'),
  天气: z.string().prefault('细雨'),
  白素贞: z.object({
    当前位置: z.string().prefault('西湖断桥'),
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(60),
    外貌: z.string().prefault('眉目清丽，唇色浅淡不施粉黛，素净出尘。眼底青碧色的蛇瞳敛在幽处，此刻正望着雨幕里那人的背影。鬓边几缕碎发被细雨沾湿，贴在耳畔'),
    服饰: z.object({
      外衣: z.string().prefault('藕荷刻丝褙子,直领对襟,不施纽襻,两襟松松敞着;两侧开衩至腰下,银线暗织缠枝莲纹,袖口与下摆沿边微微洇了一片水色'),
      内搭: z.string().prefault('月白软烟罗中衣,领缘滚一道银线,自褙子敞襟里露出一线;襟口微敞,锁骨若隐若现,胸前衣料绷起圆润弧度,襟上沾了几点细密雨珠'),
      贴身层: z.string().prefault('藕荷绸肚兜,绣一枝白莲,绸带系于颈后与腰间;裙内不着裈,以裳蔽体,尽掩于层层裙衫之下,不见分毫'),
      下装: z.string().prefault('浅紫百褶罗裙,腰头束紧,衬得腰身盈盈一握;宽摆垂曳,裙摆沿边绣一折白兰,下缘沾了雨星,微微洇湿'),
      鞋袜: z.string().prefault('藕荷罗袜齐踝,浅紫绸面弓鞋,鞋头尖小上翘,素线绣白莲,鞋面沾了零星雨点,尚不算湿透'),
      发饰: z.string().prefault('云髻高绾,紫玉莲纹簪斜斜固髻,鬓边一枝素白绒花沾了几颗雨珠'),
      配饰: z.string().prefault('耳垂一对珍珠坠子,映着雨光莹润;腰系浅金宫绦,绦端垂一块羊脂玉佩,贴着裙腰随雨风微微一晃'),
    }).prefault({}),
    姿势: z.string().prefault('持伞立在桥亭亭柱旁,手指仍搭在伞柄上,望着雨幕里那人的背影'),
    心理: z.string().prefault(''),
  }).prefault({}),
  小青: z.object({
    当前位置: z.string().prefault('西湖断桥'),
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(20),
    外貌: z.string().prefault('一张瓜子脸,眉眼灵动,笑起来颊边两个浅梨涡。瞳色刻意收敛装作寻常乌眼,只眼尾微微泛着一点翠色,像是戴了副薄薄的碧色琉璃目。方才催伞那一嗓子喊得又急又脆,此刻撇着嘴,面上还带着几分促狭。发梢上挂着几滴细雨'),
    服饰: z.object({
      外衣: z.string().prefault('鹅黄蝉翼纱褙子,直领对襟,纱薄如烟,风一过便掀起一角;领口敞着未系,衣带松松挽个结,襟上星星点点沾了几点雨珠'),
      内搭: z.string().prefault('鹅黄细葛衫交领掩得松,袖口挽起半截,露出半截皓腕;衣料绷在胸前鼓鼓撑起'),
      贴身层: z.string().prefault('鹅黄绸肚兜,绣一双闹春小蝶,绸带系于颈后与腰间;裙内不着裈,以裳蔽体,被外衫罗裙层层掩住,不见分毫'),
      下装: z.string().prefault('鹅黄细葛裙,腰头松松系着,裙摆垂落;沿边绣一串缠枝迎春,下缘浅沾雨星,轻盈不显湿重'),
      鞋袜: z.string().prefault('鹅黄罗袜齐踝,掩住脚踝大半圈淡淡的青鳞纹,只余一线若隐若现;鹅黄绸面弓鞋鞋头尖小上翘,绣一双黄蝶,鞋身微微沾湿'),
      发饰: z.string().prefault('发髻松松挽着几缕青丝,鬓边一枝蝶形银钗斜斜别着,钗头挂着几颗雨珠'),
      配饰: z.string().prefault('腕上一只细银镯沾了点雨水,抬手晃动时叮当轻响;腰侧坠一只绣蝶小香囊'),
    }).prefault({}),
    姿势: z.string().prefault('站在姐姐半步之后,歪着头打量雨里那个借出伞就跑的身影'),
    心理: z.string().prefault(''),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;