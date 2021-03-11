/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Chain Reaction': '连锁反应',
    'Conversion Efficiency': '转换效率',
    'Genesis': '创世纪',
    'High-energy Orbit': '高能轨道',
    'Main': '首页',
    'Options': '选项',
    'Reflection': '反射',
    'Stimulated Emission': '受激发射',
    'Unlocked at 1.00e9 photons': '解锁需要 1.00e9 光子',
    'Currently': '当前',
    'Enhanced Duplication': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    'Super-energize the atoms, tripling photon generation for 60 seconds but consuming 3 atoms.': '超激励原子，在60秒内将光子产生增加三倍，但消耗3个原子。',
    'Make the energization and fluctuation delay 4 times slower, but each energization releases 10 times as many photons.': '能量和波动延迟慢了4倍，但每次能量释放的光子是原来的10倍。',
    'Greatly reduce the amount of photons it takes to make an atom.': '大大减少了形成原子所需要的光子数量。',
    'Energize the atoms. (Press space': '激发原子。(按空格键',
    'Decrease the delay in between energizations': '减少两次通电之间的延迟',
    'Atoms affect the photon gain more, and fluctuations have a 30% chance to have a lower delay.': '原子对光子增益的影响更大，波动有30%的机会有更低的延迟。',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "Upgrades": "升级",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "\n": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^Condense (.+) photons into (.+) atom.$/, '把 $1 光子凝聚成 $2 原子。'],
    [/^Deplete (.+) photons to create 1 fluctuation.$/, '消耗 $1 光子来产生1个波动。'],
    [/^(.+)You have (.+) atoms$/, '你有 $2 原子'],
    [/^(.+)Cost: (.+) photons\n(.+)$/, '成本: $2 光子'],
    [/^(.+)Draw Photons: No\n(.+)$/, '绘制光子:否'],
    [/^(.+)Draw Anything At All: No\n(.+)$/, '绘制任何东西:否'],
    [/^(.+)Draw Anything At All: Yes\n(.+)$/, '绘制任何东西:是'],
    [/^(.+)Draw Photons: Yes\n(.+)$/, '绘制光子:是'],
    [/^(.+)You have (.+) photons.\n(.+)$/, '你有 $2 光子.'],
    [/^(.+)You have (.+) fluctuations$/, '你有 $2 波动'],
    [/^(.+)You have (.+) reflectors$/, '你有 $2 反射器'],
    [/^exciting up to (.+) atoms every (.+) seconds$/, '每 $2 秒激发多达 $1 原子'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);