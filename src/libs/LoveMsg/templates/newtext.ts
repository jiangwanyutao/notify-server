// 因微信不支持预览天气信息将图文卡片修改为文字信息
/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import { getConfig } from '../../../utils/getConfig'

const CONFIG = getConfig().loveMsg

export const newTextTemplate = (data: TextCardTemplateProps) => {
  const {
    weather,
    highest,
    lowest,
    wind,
    windsc,
    humidity,
    week,
    pop,
    pcpn,
    tips,
  } = data

  let text = `${CONFIG.girl_name}~\n`

  // 工作日/休息日，需要排除节假日
  text += `\n今日天气状况：
  天气：${weather}
  ${wind}：${windsc}
  温度：${lowest} ~ ${highest}
  湿度：${humidity}\n`

    if (weather.includes('雨')) {
        text += `降雨概率：${pop}%
  降雨量：${pcpn}mm\n`
    }
    // 生活指数提示
    if (CONFIG.weather_tips && tips) {
        text += `
  ${tips}\n`
    }

    // 最高温度
    if (CONFIG.weather_tem && highest && +highest.replace('℃', '') <= 5) {
        text += `
  哈喽哈喽~这里是来自${CONFIG.boy_name}的爱心提醒哦：
  今日最高温度仅为🥶 ${highest}，可冷可冷了~
  ${CONFIG.girl_name}可要注意保暖哦~\n`
    }


  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}
