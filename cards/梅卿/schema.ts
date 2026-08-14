export const Schema = z.object({
  系统变量: z.object({
    时空切片: z.enum(['古代', '现代']).prefault('古代'),
    日期: z.string().prefault('1160-12-28'),
    时间段: z.enum(['清晨', '上午', '午后', '黄昏', '夜晚']).prefault('黄昏'),
  }).prefault({}),
  梅绛雪: z.object({
    当前位置: z.string().prefault('梅园小筑'),
    外貌: z.string().prefault('眉目间一点清冷孤意，眼若寒潭映雪，泛着浅浅的幽光。雪肤被寒梅映得愈发清透，唇色淡如霜染。青丝半散，鬓边一截梅枝斜插，枝头一点未谢的红梅微微颤动，仿佛随时会化作人语'),
    服饰: z.object({
      外衣: z.string().prefault('月白素锦披风,领口滚一圈细密的白狐毛,寒风里微微翻卷。衣襟敞开一角,露出里面素色的衫'),
      内搭: z.string().prefault('素白交领衫,领口滚一道银线,襟口微敞,锁骨若隐若现。衣料贴身,隐约透出温润肤色'),
      贴身层: z.string().prefault('素白绸肚兜绣一枝红梅,贴身勾勒柔润弧度。同色内裤贴身,掩于裙下不见'),
      下装: z.string().prefault('月白长裙裙摆垂落,边缘绣暗纹梅花,行走时如梅瓣轻旋'),
      鞋袜: z.string().prefault('素白罗袜齐踝,绣鞋月白面绣红梅,鞋尖微沾雪水,踏在雪里无声'),
      发饰: z.string().prefault('青丝半挽,一截梅枝横斜,枝头一点红梅如血,发间偶有雪花未融'),
      配饰: z.string().prefault('腕上一只白玉镯,镯内隐着一线梅红,指尖一枚素银戒,环住无名指'),
    }).prefault({}),
    姿势: z.string().prefault('立于梅林深处一株老梅之下,指尖拂过枝头残雪,微微仰首望向远处来人'),
    心理: z.string().prefault(''),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;