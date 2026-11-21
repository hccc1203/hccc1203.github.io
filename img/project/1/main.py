from src.data_loader import excel_to_csv
from src.data_categorizer import categorizer
from src.embedding_cluster_then_llm_categorize import embedding_cluster_then_llm_categorize
from pathlib import Path
from src.data_analyze import data_analyze
from src.data_visiable import run_visualization

def main():
    
    # 读取数据并清理、转化为 CSV、分类
    excel_path = "data/raw/wechat_bill.xlsx"
    csv_path = "data/processed/wechat_bill.csv"
    data_path = "data/processed/wechat_bill_categorized.csv"
    if not Path("data/processed/wechat_bill.csv").exists() :
        excel_to_csv(excel_path, csv_path)
        categorizer()
        print("正在启动 LLM 分类......")
        embedding_cluster_then_llm_categorize()
    else:
        print("数据存在，直接开始分析")

    # 数据分析
    data_analyze(data_path)

    # 可视化
    run_visualization()

if __name__ == "__main__":
    main()