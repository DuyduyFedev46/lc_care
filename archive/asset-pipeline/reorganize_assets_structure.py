#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent
ASSETS_DIR = BASE_DIR / "frontend" / "public" / "assets"

# Target directories under public/assets
TARGET_BG_DIR = ASSETS_DIR / "backgrounds"
TARGET_MASCOT_DIR = ASSETS_DIR / "mascot"
TARGET_PLANTS_DIR = ASSETS_DIR / "plants"

def ensure_dirs():
    """Create target directories if they don't exist."""
    for d in [TARGET_BG_DIR, TARGET_MASCOT_DIR, TARGET_PLANTS_DIR]:
        d.mkdir(parents=True, exist_ok=True)
        print(f"Ensured directory: {d.relative_to(BASE_DIR)}")

def copy_file(src, dst):
    """Copy a file if it exists, logging the action."""
    if src.exists():
        shutil.copy2(src, dst)
        print(f"Copied: {src.relative_to(BASE_DIR)} -> {dst.relative_to(BASE_DIR)}")
        return True
    return False

def organize_backgrounds():
    print("\n--- Organizing Backgrounds ---")
    bg_mappings = [
        # (src_relative_to_assets, dest_name)
        ("bg2_garden_home.png", "bg_garden_home.png"),
        ("bg2_garden_home.webp", "bg_garden_home.webp"),
        ("processed_root/family_garden_scene.png", "bg_family_garden.png"),
        ("processed_root/family_garden_scene.webp", "bg_family_garden.webp"),
        ("bg2_voucher_shop.png", "bg_voucher_shop.png"),
        ("bg2_voucher_shop.webp", "bg_voucher_shop.webp"),
    ]
    for src_rel, dest_name in bg_mappings:
        src_path = ASSETS_DIR / src_rel
        dst_path = TARGET_BG_DIR / dest_name
        copy_file(src_path, dst_path)

def organize_mascots():
    print("\n--- Organizing Mascots ---")
    mascot_mappings = [
        # (src_relative_to_assets, dest_name)
        ("mascots_nobg/mascot_avatar.png", "mascot_idle.png"),
        ("mascots_nobg/mascot_avatar.webp", "mascot_idle.webp"),
        ("mascots_nobg/mascot_watering.png", "mascot_watering.png"),
        ("mascots_nobg/mascot_watering.webp", "mascot_watering.webp"),
        ("mascots_nobg/mascot_approval.png", "mascot_celebrating.png"),
        ("mascots_nobg/mascot_approval.webp", "mascot_celebrating.webp"),
        ("mascots_nobg/mascot_loading.png", "mascot_meditating.png"),
        ("mascots_nobg/mascot_loading.webp", "mascot_meditating.webp"),
        ("mascots_nobg/mascot_welcome.png", "mascot_waving.png"),
        ("mascots_nobg/mascot_welcome.webp", "mascot_waving.webp"),
    ]
    for src_rel, dest_name in mascot_mappings:
        src_path = ASSETS_DIR / src_rel
        dst_path = TARGET_MASCOT_DIR / dest_name
        copy_file(src_path, dst_path)
        
    # Also copy all files from mascots_nobg under their original names
    # to mascot/ directory for backwards-compatibility.
    mascots_nobg_dir = ASSETS_DIR / "mascots_nobg"
    if mascots_nobg_dir.exists():
        print("\n--- Copying mascots for backwards compatibility ---")
        for item in mascots_nobg_dir.iterdir():
            if item.is_file():
                copy_file(item, TARGET_MASCOT_DIR / item.name)

def organize_plants():
    print("\n--- Organizing Plants ---")
    
    # 1. Growth stages for ginger, lemongrass, lotus from processed_plants
    growth_plants = ["ginger", "lemongrass", "lotus"]
    for plant in growth_plants:
        for lvl in range(1, 6):
            for ext in ["png", "webp"]:
                src_rel = f"processed_plants/{plant}_{lvl}.{ext}"
                dest_name = f"plant_{plant}_lv{lvl}.{ext}"
                src_path = ASSETS_DIR / src_rel
                dst_path = TARGET_PLANTS_DIR / dest_name
                copy_file(src_path, dst_path)

    # 2. Level 5 mappings from processed_root/plant_{rootName}.png to plant_{plantId}_lv5.png
    root_to_id = {
        "bacha": "mint",
        "camthao": "licorice",
        "diephachau": "phyllanthus",
        "dotrong": "eucommia",
        "gung": "ginger",
        "hungque": "basil",
        "khoqua": "bittermelon",
        "lohoi": "aloe",
        "nghe": "turmeric",
        "nhansam": "ginseng",
        "oaihuong": "lavender",
        "rauma": "pennywort",
        "sa": "lemongrass",
        "sen": "lotus",
        "tiato": "perilla",
        "tra": "tea",
    }
    
    for root_name, plant_id in root_to_id.items():
        for ext in ["png", "webp"]:
            src_rel = f"processed_root/plant_{root_name}.{ext}"
            dest_name = f"plant_{plant_id}_lv5.{ext}"
            src_path = ASSETS_DIR / src_rel
            dst_path = TARGET_PLANTS_DIR / dest_name
            # Copy to target plants directory
            copy_file(src_path, dst_path)

def main():
    print(f"Starting asset reorganization. Root assets path: {ASSETS_DIR}")
    ensure_dirs()
    organize_backgrounds()
    organize_mascots()
    organize_plants()
    print("\n--- Asset reorganization complete! ---")

if __name__ == "__main__":
    main()
