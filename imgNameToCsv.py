import os
import csv
from pathlib import Path

# ================= 配置区域 =================
# 目标图片文件夹路径
TARGET_FOLDER = r"D:\work\AI\webs\mushroom\data\image"

# 输出的 CSV 文件名
OUTPUT_CSV = "图片列表.csv"
# ===========================================

def generate_img_list_csv():
    target_dir = Path(TARGET_FOLDER)
    
    # 1. 检查文件夹是否存在
    if not target_dir.exists() or not target_dir.is_dir():
        print(f"错误: 找不到文件夹 '{TARGET_FOLDER}'")
        return

    # 2. 扫描图片并提取不带后缀的文件名
    valid_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff')
    
    # f.stem 会自动去掉后缀名
    image_names = [
        f.stem for f in target_dir.iterdir() 
        if f.is_file() and f.suffix.lower() in valid_extensions
    ]
    
    # 3. 按名称排序
    image_names.sort()

    if not image_names:
        print(f"提示: 在文件夹中没有找到后缀名为 {valid_extensions} 的图片。")
        return

    # 4. 写入 CSV 文件
    try:
        # utf-8-sig 编码保证 Excel 打开不乱码
        with open(OUTPUT_CSV, mode='w', newline='', encoding='utf-8-sig') as csvfile:
            writer = csv.writer(csvfile)
            # 写入表头
            writer.writerow(['序号', '名称'])
            
            # 写入数据
            for index, name in enumerate(image_names, start=1):
                writer.writerow([index, name])
                
        print(f"--- 处理完成 ---")
        print(f"扫描路径: {target_dir.absolute()}")
        print(f"生成文件: {os.path.abspath(OUTPUT_CSV)}")
        print(f"共计图片: {len(image_names)} 张")
        
    except PermissionError:
        print(f"错误: 无法写入 {OUTPUT_CSV}。请先关闭已打开的 Excel 文件。")
    except Exception as e:
        print(f"发生未知错误: {e}")

if __name__ == "__main__":
    generate_img_list_csv()