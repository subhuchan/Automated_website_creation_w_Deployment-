import subprocess
import sys

print("=" * 60)
print("Installing google-generativeai package...")
print("=" * 60)

try:
    # Try to install the package
    subprocess.check_call([sys.executable, "-m", "pip", "install", "google-generativeai==0.8.3"])
    print("\n✅ SUCCESS! Package installed successfully!")
    
    # Verify installation
    import google.generativeai as genai
    print("✅ Package can be imported!")
    print(f"✅ Using Python: {sys.executable}")
    print(f"✅ Python version: {sys.version}")
    
except subprocess.CalledProcessError as e:
    print(f"\n❌ Installation failed: {e}")
    print("\nTry running this command manually:")
    print(f"  {sys.executable} -m pip install google-generativeai==0.8.3")
    
except ImportError:
    print("\n⚠️  Package installed but cannot be imported.")
    print("This might be a different Python version issue.")
    print(f"Current Python: {sys.executable}")

print("\n" + "=" * 60)
print("After installation, restart the backend server!")
print("=" * 60)
