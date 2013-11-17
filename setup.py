import os
from setuptools import find_packages, setup


def read(fname):
    """Utility function to read the README.rst file."""
    return open(os.path.join(os.path.dirname(__file__), fname)).read()


setup(
    name="t3",
    version="0.1",
    author="Elevencraft Inc.",
    author_email="matt@11craft.com",
    description="Toptal Todo Tackler",
    license="BSD",
    packages=find_packages('.'),
    long_description=read('README.rst'),
    entry_points="""
    """,
)
