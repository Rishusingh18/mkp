import os

def update_home():
    with open('src/app/page.tsx', 'r') as f:
        content = f.read()

    # 1. Main background
    content = content.replace('bg-[#faecc3]', 'bg-background-light', 1)
    
    # 2. Testimonial Box
    content = content.replace(
        'bg-[#faecc3] border-l-4 border-primary p-4 rounded-r backdrop-blur-sm max-w-md hidden md:block',
        'bg-white border-l-4 border-primary p-4 rounded-r backdrop-blur-sm max-w-md hidden md:block'
    )
    
    # 3. Recent Moves Section
    content = content.replace('bg-[#faecc3]/50 border-t border-primary/10', 'bg-white border-t border-primary/10')
    content = content.replace('bg-[#faecc3]/80 px-2 py-1', 'bg-white/80 px-2 py-1')

    # 4. All others should be secondary
    content = content.replace('[#faecc3]', 'secondary')
    
    with open('src/app/page.tsx', 'w') as f:
        f.write(content)

def update_inventory():
    with open('src/app/inventory/page.tsx', 'r') as f:
        content = f.read()
    
    # 1. Main background
    content = content.replace('bg-[#faecc3]', 'bg-background-light')
    
    with open('src/app/inventory/page.tsx', 'w') as f:
        f.write(content)

def update_delhi():
    with open('src/app/packers-and-movers/delhi/page.tsx', 'r') as f:
        content = f.read()
        
    # Section/Card backgrounds to white or light
    content = content.replace('className="bg-[#faecc3] rounded-2xl', 'className="bg-white rounded-2xl')
    content = content.replace('className="bg-[#faecc3] rounded-xl p-4', 'className="bg-white rounded-xl p-4')
    content = content.replace('className="mt-8 bg-[#faecc3] rounded-xl p-5', 'className="mt-8 bg-white rounded-xl p-5')
    content = content.replace('bg-[#faecc3] border-b border-primary/10 text-sm uppercase', 'bg-secondary border-b border-primary/10 text-sm uppercase')
    content = content.replace('bg-[#faecc3] rounded-xl p-6 flex flex-col', 'bg-white rounded-xl p-6 flex flex-col')
    content = content.replace('hover:bg-[#faecc3]', 'hover:bg-white')
    content = content.replace('w-16 h-16 rounded-full bg-[#faecc3]', 'w-16 h-16 rounded-full bg-secondary/10')
    content = content.replace('bg-[#faecc3] p-4 rounded-xl', 'bg-background-light p-4 rounded-xl')
    content = content.replace('w-12 h-12 rounded-full bg-[#faecc3]', 'w-12 h-12 rounded-full bg-secondary/10')
    content = content.replace('bg-[#faecc3] rounded-xl shadow-md', 'bg-white rounded-xl shadow-md')
    content = content.replace('bg-[#faecc3] border-y', 'bg-white border-y')
    content = content.replace('bg-[#faecc3] border rounded-xl', 'bg-white border rounded-xl')
    
    # How it works circle:
    content = content.replace('rounded-full bg-[#faecc3] border-2', 'rounded-full bg-background-light border-2')
    
    # Table background tweaks
    content = content.replace('bg-[#faecc3] border-b border-primary/10', 'bg-secondary/20 border-b border-primary/10')
    content = content.replace('<td className="p-4 text-center bg-[#faecc3]">', '<td className="p-4 text-center bg-secondary/20">')
    
    # Main background
    content = content.replace('<main className="min-h-screen bg-[#faecc3] pb-20">', '<main className="min-h-screen bg-background-light pb-20">')
    
    # All remaining #faecc3 -> secondary
    content = content.replace('[#faecc3]', 'secondary')

    with open('src/app/packers-and-movers/delhi/page.tsx', 'w') as f:
        f.write(content)

def update_summary():
    with open('src/app/summary/page.tsx', 'r') as f:
        content = f.read()

    # Main background
    content = content.replace('bg-[#faecc3] relative', 'bg-background-light relative', 1)
    
    # All remaining #faecc3 -> secondary
    content = content.replace('[#faecc3]', 'secondary')

    with open('src/app/summary/page.tsx', 'w') as f:
        f.write(content)

update_home()
update_inventory()
update_delhi()
update_summary()
print("Colors updated successfully.")
