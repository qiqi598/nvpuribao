# nvpuribao.com - 女仆日报

杭州女仆圈资讯聚合平台

## 页面结构
- `/` 首页
- `/gossip` 今日八卦快报
- `/schedule` 今日排班速报
- `/shops` 店铺导航（139家）
- `/reviews` 测评速报

## 数据目录（data/，不入git）
构建时需要从服务器同步以下文件：
- `gossip_report_gossip_s1.txt` 八卦午间版
- `gossip_report_gossip_s2.txt` 八卦下午版
- `gossip_report_gossip_s3_prev.txt` 八卦夜间版
- `schedule_cache.json` 排班数据
- `reviews_today.json` 测评数据
- `shops.csv` 店铺黄页

## 部署
Cloudflare Pages，push main 自动触发构建
