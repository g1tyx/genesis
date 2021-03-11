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
    'Enhanced Duplication': '增强复制',
    'Instability': '不稳定性',
    'Make fluctuations scale half as fast.': '使波动速度减半。',
    'Temporal Energy': '时空能量',
    'and increasing the fluctuation cap by': '并增加波动上限',
    'Enhanced Distortion': '增强失真',
    'LOCKED': '未解锁',
    'reducing the nerf of': '减少削弱',
    'Stars': ' 恒星',
    'stars, boosting photon generation by': '恒星，促进了光子的产生',
    'stars. (Next at': ' 恒星。 （下一个',
    'Advanced Cloning Techniques': '先进的克隆技术',
    'Full Autonomy': '完全自治',
    'Multiply photon amount by': '光子数量乘以',
    'Reaction undergoing, please wait for it to finish.': '反应正在进行中，请等待反应结束。',
    'Reactor': '反应堆',
    'Start reaction': '开始反应',
    'The reaction will create': '反应会产生',
    'Unlocked at 100 atoms': '解锁需要 100 原子',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    'You can clone at most 20 atoms at once.': '你一次最多可以克隆20个原子。',
    'Unlocked atom types': '解锁原子类型',
    'Unlock automation.': '解锁自动化。',
    'Stars boost atom generation from reflectors at a reduced rate.': '恒星通过反射器以较低的速率促进原子生成。',
    'Solar Flares': '太阳耀斑',
    'Reflectors boost star gain. Currently': '反射器提高恒星增益。目前',
    'Pseudo-Stars': '伪星',
    'Perceptive warping of perceptive warps': '感知曲速的感知曲速',
    'Perceptive warp\'s effects act as if there were x^2 warps, while their costs act as if there were x^0.7 warps.': '感知曲速的效果相当于有x^2个曲速，而其成本相当于有x^0.7个曲速。',
    'Reset photons, atoms, and fluctuations.': '重置光子，原子和波动。',
    'Raise all perceptive warp effects to the 1.3.': '将所有感知经线效果提高到1.3。',
    'Super-energize the atoms, quadrupling time speed for 60 seconds but consuming 3 atoms.': '超能化原子，将时间速度提高四倍，持续60秒，但消耗3个原子。',
    'This is applied 150 ms after the initial energization, and can happen more than once': '初次通电后150毫秒施加此信号，并且可能发生不止一次',
    'Super-energy now makes time pass by 4x faster for all mechanics below reflection and super-energy.': '现在，超能使反射和超能以下所有力学的时间缩短了4倍。',
    'Every energization has a reduced chance of producing an atom.': '每次通电都会减少产生原子的几率。',
    'Super-energize the atoms, tripling photon generation for 60 seconds but consuming 3 atoms.': '超能化原子，在60秒内将光子产生增加三倍，但消耗3个原子。',
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
    "by ": "",
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
    "Gain": "获得 ",
    "You have": "你有 ",
    "Effects": "效果",
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
    [/^(.+)Cost: (.+) stars\n(.+)$/, '成本: $2 恒星'],
    [/^(.+)Draw Photons: No\n(.+)$/, '绘制光子:否'],
    [/^(.+)Draw Anything At All: No\n(.+)$/, '绘制任何东西:否'],
    [/^(.+)Draw Anything At All: Yes\n(.+)$/, '绘制任何东西:是'],
    [/^(.+)Primary atoms\n(.+)$/, '初级原子'],
    [/^(.+)Secondary atoms\n(.+)$/, '次级原子'],
    [/^(.+)Draw Photons: Yes\n(.+)$/, '绘制光子:是'],
    [/^(.+)You have (.+) photons.\n(.+)$/, '你有 $2 光子.'],
    [/^(.+)You have (.+) fluctuations$/, '你有 $2 波动'],
    [/^(.+)You have (.+) reflectors$/, '你有 $2 反射器'],
    [/^(.+)You have (.+) reflector$/, '你有 $2 反射器'],
    [/^(.+)You have (.+) perceptive warp$/, '你有 $2 感知曲速'],
    [/^(.+)You have (.+) perceptive warps$/, '你有 $2 感知曲速'],
    [/^Construct (.+) reflectors together to build 1 perceptive warp.$/, '将 $1 个反射器组装起来，建造1个感知曲速。'],
    [/^Use (.+) atoms to create 1 reflector.$/, '使用 $1 原子创建1个反射器。'],
    [/^Requires: (.+) perceptive warps$/, '需要：$1 感知曲速'],
    [/^giving a (.+)\% chance to energize an atom again after energizing.$/, '在激发后，有 $1\％ 的机会再次激发原子。'],
    [/^Super-energize the atoms. \(Time left: (.+) seconds$/, '超能化原子。\(剩余时间：$1 秒'],
    [/^exciting up to (.+) atoms every (.+) seconds$/, '每 $2 秒激发多达 $1 原子'],
    [/^Next at: (.+) stars$/, '下一个：$1 恒星'],
    [/^Unlocked at (.+) photons$/, '解锁需要 $1 光子'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);