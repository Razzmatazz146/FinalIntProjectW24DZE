import matplotlib.pyplot as plt
import numpy as np
try:
    # Create a figure and a set of subplots
    fig, ax = plt.subplots()

    # Generate some fake data
    x = np.linspace(0, 10, 100)
    y = np.sin(x)

    # Plot the data
    ax.plot(x, y)

    # Set the title and labels
    ax.set_title('Fake Graph')
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    print('dfsffs')

    # Save the figure as an image
    fig.savefig('images/fake_graph.png')
except Exception as e:
    print(e)


